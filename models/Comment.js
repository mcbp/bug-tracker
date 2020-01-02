const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'ticket',
    required: true
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  text: {
    type: String,
    required: true
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

module.exports = Comment = mongoose.model('comment', CommentSchema)
