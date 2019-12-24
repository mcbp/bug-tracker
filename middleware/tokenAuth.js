const jwt = require('jsonwebtoken')

function tokenAuth(req, res, next) {
  const token = req.header('x-auth-token')

  // Check for token
  if (!token) {
    return res.status(401).json({msg: 'No token, authorisation denied'})
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Add user from payload to request
    req.user = decoded
    // Call next middleware
    next()
  } catch(e) {
    res.status(400).json({msg: 'Token is invalid'})
  }
}

module.exports = tokenAuth
