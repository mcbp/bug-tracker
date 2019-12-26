const jwt = require('jsonwebtoken')

function tokenAuth(req, res, next) {
  const token = req.header('x-auth-token')

  // Check for token
  if (!token) {
    return res.status(401).json({msg: ['You must be signed in to perform this action']})
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Add user from payload to request
    req.user = decoded
    // Call next middleware
    next()
  } catch(e) {
    res.status(400).json({msg: ['You do not have permission to perform this action']})
  }
}

module.exports = tokenAuth
