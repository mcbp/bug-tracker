const express = require('express')
const router = express.Router()
const { check, oneOf, validationResult } = require('express-validator')
const tokenAuth = require('../../middleware/tokenAuth')
const entities = require('html-entities').AllHtmlEntities;

const Ticket = require('../../models/Ticket')
const User = require('../../models/User')

// @route   GET api/tickets
// @desc    Get all tickets, or for one project if specified
// @access  Public
router.get('/', (req, res) => {

  const { search, id: _id, project } = req.query

  if (search && project) {
    Ticket.find({title: {"$regex": search, "$options" : "i"}, project}).populate('project').populate('submitter')
      .then(tickets => res.json(tickets))
  }
  else if (search) {
    Ticket.find({title: {"$regex": search, "$options" : "i"}}).populate('project').populate('submitter')
      .then(tickets => res.json(tickets))
  }
  else if (project) {
    Ticket.find({project}).populate("project").populate('project').populate('submitter')
      .then(tickets => res.json(tickets))
  }
  else if (_id) {
    Ticket.findOne({_id}).populate("project").populate('project').populate('submitter')
      .then(tickets => res.json(tickets))
  }
  else {
     Ticket.find({}).populate('project').populate('submitter')
       .then(tickets => res.json(tickets))
   }

})

// Validation middleware
const newTicketValidation = [
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
router.post('/', tokenAuth, newTicketValidation, (req, res) => {

  Object.keys(req.body).map(property => req.body[property] = entities.decode(req.body[property]))

  const { title, description, submitter, project, ticketType, priority } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const newTicket = new Ticket({
    title, description, submitter, project, ticketType, priority, status: "Open"
  })

  newTicket.save()
    .then(ticket => {
      res.json(ticket)
    })
})

// Validation middleware
const editTicketValidation = [
  check('_id').not().isEmpty().trim().escape(),
  oneOf([
    check('title').not().isEmpty().trim().escape(),
    check('description').not().isEmpty().trim().escape(),
    check('submitter').not().isEmpty().trim().escape(),
    check('project').not().isEmpty().trim().escape(),
    check('ticketType').not().isEmpty().trim().escape(),
    check('priority').not().isEmpty().trim().escape(),
    check('status').not().isEmpty().trim().escape()
  ])
]

// @route   POST api/projects/edit
// @desc    Edit a ticket
// @access  Private
router.post('/edit', tokenAuth, editTicketValidation, (req, res) => {

  Object.keys(req.body).map(property => req.body[property] = entities.decode(req.body[property]))

  const { _id, title, description, project, ticketType, priority, status } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: ["At least one field must be updated"]})
  }

  delete req.body["_id"]
  for (let key in req.body) {
    if(req.body[key] === undefined || req.body[key] === '') {
      delete req.body[key]
    }
  }
  req.body.last_updated = Date.now()

  // Find project and update
  Ticket.findOneAndUpdate({_id}, {$set: req.body, last_updated: Date.now()}, {new:true}).populate('project').populate('submitter')
    .then(ticket => {
      res.json(ticket)
    })
})

// Validation middleware
const deleteTicketValidation = [
  check('title').not().isEmpty().trim().escape().withMessage('Ticket title must not be empty')
]

// @route   POST api/tickets/delete
// @desc    Delete a ticket
// @access  Private
router.post('/delete', tokenAuth, deleteTicketValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { _id, title } = req.body

  //Find project and delete if name matches
  Ticket.findOneAndDelete({_id, title})
    .then(ticket => {
      if (!ticket) return res.status(400).json({msg: ['Ticket title incorrect']})
      res.json(ticket)
    })
})

module.exports = router
