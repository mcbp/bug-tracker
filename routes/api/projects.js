const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const convertToSlug = require('../../helpers')
const tokenAuth = require('../../middleware/tokenAuth')
const isAdmin = require('../../middleware/isAdmin')

const Project = require('../../models/Project')

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', (req, res) => {
  Project.find({})
    .then(project => res.json(project))
})

// @route   GET api/projects/:slug
// @desc    Get one project by slug
// @access  Public
router.get('/:slug', (req, res) => {
  Project.findOne({slug: req.params.slug})
    .then(currentProject => {
      if (!currentProject) return res.status(400).json({error: "Project does not exist"})
      res.json(currentProject)
    })
})

// Validation middleware
const projectValidation = [
  check('name')
    .not().isEmpty().trim().escape().withMessage('Project name is required')
]

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post('/', tokenAuth, isAdmin, projectValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { name, description } = req.body
  const slug = convertToSlug(name)

  // Check for already existing project
  Project.findOne({slug})
    .then(project => {
      if (project) return res.status(400).json({msg: ['Project already exists']})

      const newProject = new Project({
        name, description, slug
      })

      newProject.save()
        .then(project => {
          res.json({
            project: {
              name: project.name,
              description: project.description
            }
          })
        })
    })

})

// @route   POST api/projects/edit
// @desc    Edit a project
// @access  Private
router.post('/edit', tokenAuth, isAdmin, projectValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { _id, name, description } = req.body
  const slug = convertToSlug(name)

  // Check if already exists
  Project.findOne({_id})
    .then(project => {
      if (project && project.length) return res.status(400).json({msg: ['Project already exists']})
      // Find project and update
      Project.findOneAndUpdate({_id}, {$set: {name, description, slug, last_updated: Date.now()}}, {new:true})
        .then(project => {
          res.json(project)
        })
    })
})

// @route   POST api/projects/delete
// @desc    Delete a project
// @access  Private
router.post('/delete', tokenAuth, isAdmin, projectValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({msg: errors.array().map(err => err['msg'])})
  }

  const { _id, name } = req.body

  //Find project and delete if name matches
  Project.findOneAndDelete({_id, name})
    .then(project => {
      if (!project) return res.status(400).json({msg: ['Project name incorrect']})
      res.json(project)
    })
})

// @route   GET api/projects/list/name
// @desc    Get a list of all project names
// @access  Public
router.get('/list/name', (req, res) => {
  Project.find({})
    .then(projects => {
      const list = projects.map(({name}) => ({name}))
      res.json(list)
    })
})

module.exports = router
