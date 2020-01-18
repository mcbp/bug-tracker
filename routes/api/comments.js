const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const tokenAuth = require('../../middleware/tokenAuth')
const entities = require('html-entities').AllHtmlEntities;

const Comment = require('../../models/Comment')

// @route   GET api/comments
// @desc    Get all comments for a ticket
// @access  Public
router.get('/', (req, res) => {

  const { ticket } = req.query

  Comment.find({ticket}).populate('submitter', '_id name')
    .then(comments => {
      comments.forEach(comment => {
        comment.text = entities.decode(comment.text)
      })
      res.json(comments)
    })
})

// Validation middleware
const newCommentValidation = [
  check('text')
    .not().isEmpty().trim().escape().withMessage('A comment cannot be empty'),
]

// @route   POST api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', tokenAuth, newCommentValidation, (req, res) => {

  const { ticket, submitter, text } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const newComment = new Comment({
    ticket, submitter, text
  })

  newComment.save()
    .then(comment => {
      res.json(comment)
    })

})

module.exports = router
