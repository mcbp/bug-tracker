const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require('path')

const app = express()

// JSON middleware
app.use(express.json())

// Setup application routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/projects', require('./routes/api/projects'))
app.use('/api/tickets', require('./routes/api/tickets'))
app.use('/api/comments', require('./routes/api/comments'))
app.use('/api/charts', require('./routes/api/charts'))

const port = process.env.PORT || 5000

// Serve static assets for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log(err))

// Run server
app.listen(port, () => console.log(`server started on port ${port}`))
