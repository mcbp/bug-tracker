const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const tokenAuth = require('../../middleware/tokenAuth')

// User database schema
const User = require('../../models/User')

// Validation middleware
const registerValidation = [
  check('name')
    .not().isEmpty().trim().escape().withMessage('Name is required')
    .matches(/^[a-zA-Z0-9-_]+$/i).withMessage('Name can only contain letters, numbers, dashes and underscores'),
  check('email')
    .not().isEmpty().trim().escape().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address').normalizeEmail(),
  check('password')
    .isLength({min: 8}).trim().escape().withMessage('Password must be at least 8 characters')
]

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', registerValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { name, email, password } = req.body

  // Check for exisitng user
  User.findOne({email})
    .then(user => {
      if (user) return res.status(400).json({msg: ['User already exists']})

      const newUser = new User({
        name, email, password
      })

      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => {

              // Send back new user details and jwt token
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  })
                }
              )

            })
        })
      })
    })
})

// Validation middleware
const nameValidation = [
  check('name').not().isEmpty().trim().escape().withMessage('New name is required')
]

// @route   POST api/users/name
// @desc    Change name
// @access  Private
router.post('/name', tokenAuth, nameValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { _id, name } = req.body
  // Update a users name
  User.findOneAndUpdate({_id}, {$set: {name, last_updated: Date.now()}}, {new: true, upsert: true})
    .select('-password')
    .then(user => {
      res.json({user})
    })
})


// Validation middleware
const passwordValidation = [
  check('currentPassword')
    .not().isEmpty().trim().escape().withMessage('Current password is required'),
  check('newPassword')
    .isLength({min: 8}).trim().escape().withMessage('New password must be at least 8 characters')
]

// @route   POST api/users/password
// @desc    Change password
// @access  Private
router.post('/password', tokenAuth, passwordValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }
  const { _id, currentPassword, newPassword } = req.body

  // Check password mmatches
  User.findOne({_id})
  .then(user => {
    // Compare sent pw to hash db pw
    bcrypt.compare(currentPassword, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({msg: ['Current password is incorrect']})
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err
            // Update a users password
            User.findOneAndUpdate({_id}, {$set: {password: hash, last_updated: Date.now()}}, {new: true, upsert: true})
              .select('-password')
              .then(user => {
                res.json({user})
              })
          })
        })
      })
  })

})


module.exports = router
