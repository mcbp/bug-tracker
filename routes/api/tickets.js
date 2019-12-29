const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const tokenAuth = require('../../middleware/tokenAuth')

const Ticket = require('../../models/Ticket')

// @route   GET api/tickets
// @desc    Get all tickets, or for one project if specified
// @access  Public
router.get('/', (req, res) => {

  const { search, project } = req.query

  if (search && project) {
    Ticket.find({title: {"$regex": search, "$options" : "i"}, project}).populate("project")
      .then(tickets => res.json(tickets))
  }
  else if (search) {
    Ticket.find({title: {"$regex": search, "$options" : "i"}}).populate("project")
      .then(tickets => res.json(tickets))
  }
  else if (project) {
    Ticket.find({project}).populate("project")
      .then(tickets => res.json(tickets))
  }
   else {
     Ticket.find({}).populate("project")
       .then(tickets => res.json(tickets))
   }

})

// Validation middleware
const ticketValidation = [
  check('title')
    .not().isEmpty().trim().escape().withMessage('Ticket title is required'),
  check('description')
    .not().isEmpty().trim().escape().withMessage('Description is required'),
  check('submitter')
    .not().isEmpty().trim().escape().withMessage('You must be signed in to submit a ticket'),
  check('project')
    .not().isEmpty().trim().escape().withMessage('Project is required'),
  check('ticketType')
    .not().isEmpty().trim().escape().withMessage('Ticket type is required'),
  check('priority')
    .not().isEmpty().trim().escape().withMessage('Priority is required')
]

// @route   POST api/projects
// @desc    Create a new ticket
// @access  Private
router.post('/', tokenAuth, ticketValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { title, description, submitter, project, ticketType, priority } = req.body

  const newTicket = new Ticket({
    title, description, submitter, project, ticketType, priority, status: "Open"
  })

  newTicket.save()
    .then(ticket => {
      res.json(ticket)
    })
})

module.exports = router
