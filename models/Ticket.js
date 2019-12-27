const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
    //required: true
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    //required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project'
    //required: true
  },
  ticket_type: {
    type: String,
    enum: ['Bugs/Errors', 'Feature Requests', 'Other Comments']
    //required: true
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
    //required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed']
    //required: true
  },
  assigned: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Ticket = mongoose.model('ticket', TicketSchema)
