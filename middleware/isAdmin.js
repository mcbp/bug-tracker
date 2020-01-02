const User = require('../models/User')

function isAdmin(req, res, next) {

  if (!req.user) {
    return res.status(401).json({msg: ['You must be signed in to perform this action']})
  }

  User.findOne({_id: req.user.id, isAdmin: true})
    .then(user => {
      if (!user) return res.status(401).json({msg: ['You must be an administrator to perform this action']})
      next()
    })
    .catch(err => {
      return res.status(401).json({msg: ['You must be an administrator to perform this action']})
    })

}

module.exports = isAdmin
