const express = require('express')
const router = express.Router()

const Ticket = require('../../models/Ticket')

// @route   GET api/charts/tickets-by-priority
// @desc    Get tickets by priority
// @access  Public
router.get('/tickets-by-priority', (req, res) => {
  Ticket.aggregate([{
    $group : {
      _id: '$priority',
      count: {$sum : 1}
    }
  }])
    .then(data => {
      res.json(data)
    })
})

// @route   GET api/charts/tickets-by-type
// @desc    Get tickets by type
// @access  Public
router.get('/tickets-by-type', (req, res) => {
  Ticket.aggregate([{
    $group : {
      _id: '$ticketType',
      value: {$sum : 1}
    }
  }])
    .then(data => {
      res.json(data)
    })
})

// @route   GET api/charts/tickets-by-status
// @desc    Get tickets by status
// @access  Public
router.get('/tickets-by-status', (req, res) => {
  Ticket.aggregate([{
    $group : {
      _id: '$status',
      count: {$sum : 1}
    }
  }])
    .then(data => {
      res.json(data)
    })
})

module.exports = router
