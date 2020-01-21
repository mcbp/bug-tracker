const express = require('express')
const router = express.Router()

const Ticket = require('../../models/Ticket')

// @route   GET api/charts/tickets-by-priority
// @desc    Get open tickets by priority
// @access  Public
router.get('/tickets-by-priority', (req, res) => {
  Ticket.aggregate([
    {
      "$match": {
        status: {
          "$ne": 'Closed'
        }
      }
    },
    {
      $group: {
        _id: '$priority',
        count: {$sum: 1}
      }
    }
  ])
    .sort({_id: 1})
    .then(data => {
      res.json(data)
    })
})

// @route   GET api/charts/tickets-by-type
// @desc    Get open tickets by type
// @access  Public
router.get('/tickets-by-type', (req, res) => {
  Ticket.aggregate([
    {
      "$match": {
        status: {
          "$ne": 'Closed'
        }
      }
    },
    {
      $group: {
        _id: '$ticketType',
        value: {$sum: 1}
      }
    }
  ])
    .sort({_id: 1})
    .then(data => {
      res.json(data)
    })
})

// @route   GET api/charts/tickets-by-status
// @desc    Get tickets by status
// @access  Public
router.get('/tickets-by-status', (req, res) => {
  Ticket.aggregate([
    {
      $group: {
        _id: '$status',
        count: {$sum: 1}
      }
    }
  ])
    .sort({_id: -1})
    .then(data => {
      res.json(data)
    })
})

// @route   GET api/charts/tickets-by-latest-update
// @desc    Get last five tickets by latest update
// @access  Public
router.get('/tickets-by-latest-update', (req, res) => {
  Ticket.find({})
    .sort({'last_updated': -1})
    .limit(4)
    .then(data => {
      res.json(data)
    })

})

module.exports = router
