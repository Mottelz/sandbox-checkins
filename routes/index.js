const express = require('express')
const moment = require('moment')
const router = express.Router()
// These controllers serve as a TOC for this file.
// They tell you the order.
const volunteers_ctr = require('../controllers/volunteers_ctr.js')
const cards_ctr = require('../controllers/cards_ctr.js')
const checkins_ctr = require('../controllers/checkins_ctr.js')
const schedules_ctr = require('../controllers/schedule_ctr')

//TODO: ADD ERROR MESSAGES!!!

/* The index */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' })
  res.redirect('/test')
})

// This is just used to test things.
router.get('/test', function (req, res) {
    // let msg = moment.utc().format("x")
    res.render('schedule_add', {title: "Add to Schedule"})
})

/* The add new volunteer endpoint.*/
router
    .get('/signup', function (req, res) {
      res.render('volunteer_add', {title: 'Volunteer Sign Up'})
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
      res.render('card_add', {title: 'Add a card'})
    })
    .post('/card', async function (req, res) {
      let added = await cards_ctr.addCard(req.body)

      if(added){
        res.render('index', {title: "You've been added"})
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
        res.render('schedule_add', {title: "Add to Schedule"})
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
router.get('/schedule', function (req, res) {
    res.render('schedule', {title:"Schedule: Winter 2019"})
})
module.exports = router
