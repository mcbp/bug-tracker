const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenAuth = require('../../middleware/tokenAuth')

// User database schema
const User = require('../../models/User')

// @route   POST api/auth
// @desc    Authenticate a user
// @access  Public
router.post('/', (req, res) => {
  var { email, password } = req.body

  //Demo login
  if (email === "demouser@example.com") {
    password = "thedemopassword"
  }

  // Simple validation - improve
  if (!email || !password) {
    return res.status(400).json({msg: ['Please enter all fields']})
  }

  // Check for existing user
  User.findOne({email})
  .then(user => {
    if (!user) return res.status(400).json({msg: ['User does not exists']})

    // Compare sent pw to hash db pw
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({msg: ['Invalid credentials']})

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err
            res.json({
              token,
              user: {
                _id: user.id,
                name: user.name,
                email: user.email
              }
            })
          }
        )
      })
  })
})

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', tokenAuth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})


module.exports = router
