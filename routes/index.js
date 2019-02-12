const express = require('express')
const moment = require('moment')
const router = express.Router()
const checkins_ctr = require('../controllers/checkins_ctr.js')
const volunteers_ctr = require('../controllers/volunteers_ctr.js')
const cards_ctr = require('../controllers/cards_ctr.js')

/* The index */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' })
  res.redirect('/signup')
})

/* The add new volunteer endpoint.*/
router
    .get('/signup', function (req, res) {
      res.render('volunteer_signup', {title: 'Volunteer Sign Up'})
    })
    .post('/signup', async function (req, res) {
      let added = await volunteers_ctr.addVolunteer(req.body)

      if (added) {
        res.redirect('/card')
      } else {
        res.redirect('/signup')
      }
    })

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

router.get('/test', function (req, res) {
  let msg = moment.utc()
  res.render('index', {title: msg})
})

/* The checkin endpoint.
*  expects /checkin?card_number=########*/
router.get('/checkin', async function (req, res) {
  let response_msg;
  if(req.query.card_number) {
    response_msg = await checkins_ctr.checkin(req.query.card_number)
  } else {
    response_msg = "Please send a valid card_number."
  }
  res.send(response_msg)
})

module.exports = router
