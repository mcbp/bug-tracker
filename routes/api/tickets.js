const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const tokenAuth = require('../../middleware/tokenAuth')

const Ticket = require('../../models/Ticket')

// @route   GET api/tickets
// @desc    Get all tickets, or for one project if specified
// @access  Public
router.get('/', (req, res) => {

  const { project } = req.query

  if (project) {
    Ticket.find({project}).populate("project")
      .then(tickets => res.json(tickets))
  }
   else {
     Ticket.find({}).populate("project")
       .then(tickets => res.json(tickets))
   }

})

// @route   POST api/projects
// @desc    Create a new ticket
// @access  Private
router.post('/', (req, res) => {

  const { title, project } = req.body

  const newTicket = new Ticket({
    title, project
  })

  newTicket.save()
    .then(ticket => {
      res.json(ticket)
    })

})

module.exports = router
