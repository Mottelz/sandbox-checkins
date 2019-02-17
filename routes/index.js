const express = require('express')
const router = express.Router()
// These controllers serve as a TOC for this file.
// They tell you the order.
const volunteers_ctr = require('../controllers/volunteers_ctr.js')
const cards_ctr = require('../controllers/cards_ctr.js')
const checkins_ctr = require('../controllers/checkins_ctr.js')
const schedules_ctr = require('../controllers/schedule_ctr.js')
const projects_ctr = require('../controllers/projects_ctr.js')

//TODO: ADD ERROR MESSAGES!!!

/* The index */
router.get('/', function(req, res) {
    // res.render('index', {title: "Test", message: "Blah"})
    res.redirect('/card')
})

/* The add new volunteer endpoint.*/
router
    .get('/signup', function (req, res) {
      res.render('add_volunteer', {title: 'Volunteer Sign Up'})
    })
    .post('/signup', async function (req, res) {
      let added = await volunteers_ctr.addVolunteer(req.body)

      if (added) {
        res.redirect('/card')
      } else {
        res.redirect('/signup')
      }
    })

/* The form to add a student id card. */
router
    .get('/card', function (req, res) {
      res.render('add_card', {title: 'Add a card'})
    })
    .post('/card', async function (req, res) {
      let added = await cards_ctr.addCard(req.body)

      if(added){
          res.redirect('/hours')
      } else {
          res.redirect('/card')
      }
    })

/* The checkin endpoint.
*  expects /checkin?card_number=########*/
router
    .get('/checkin', async function (req, res) {
      let response_msg;
      if(req.query.card_number) {
        response_msg = await checkins_ctr.checkin(req.query.card_number)
      } else {
        response_msg = "Please send a valid card_number."
      }
      res.send(response_msg)
    })

/* The form to add to the schedule. */
router
    .get('/hours', function (req, res) {
        res.render('add_schedule', {title: "Add to Schedule"})
    })
    .post('/hours', async function (req, res) {
        let result = await schedules_ctr.addSchedule(req.body)
        if (result) {
            res.redirect('/schedule')
        } else {
            res.redirect('/hours')
        }
    })

/* The actual bloody schedule */
router.get('/schedule', async function (req, res) {
    let term = await (req.term == null) ? schedules_ctr.getTerm() : req.term // This is here so we can take in old terms if need be.
    let data = await schedules_ctr.getSchedule(term)
    res.render('schedule', {title:"Schedule: " + term, caldata: data})
})

/* The form to create a project. */
router
    .get('/project', function (req, res) {
        res.render('add_project', {title: "Create New Project"})
    })
    .post('/project', async function (req, res) {
        let result = await projects_ctr.addProject(req.body)
        if (result) {
            res.redirect('/join_project')
        } else {
            res.redirect('/project')
        }
    })

/* The form to add a volunteer to a project. */
router
    .get('/join_project', async function (req, res) {
        let projects = await projects_ctr.getAllProjects()
        res.render('add_volunteer_to_project', {title: 'Join Project', projects: projects})
    })
    .post('/join_project', async function(req, res) {
        let result = await projects_ctr.addToProject(req.body)
        if (result) {
            res.redirect('/projects')
        } else {
            res.redirect('/join_project')
        }
    })

/* The page with all the projects! */
router.get('/projects', async function (req, res) {
    let projectData = await projects_ctr.getAllProjectsWithVolunteers()
    res.render('projects', {title:"Projects", projects: projectData})
})
module.exports = router
