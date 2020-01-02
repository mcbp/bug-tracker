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
    ref: 'user'
    //required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project'
    //required: true
  },
  ticketType: {
    type: String,
    enum: ['Bugs/Errors', 'Feature Requests', 'Comments/Misc']
    //required: true
  },
  priority: {
    type: Number,
    enum: [1, 2, 3]
    //required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed', 'More information required']
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
