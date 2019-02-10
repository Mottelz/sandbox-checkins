const express = require('express')
const router = express.Router()
const checkins_ctr = require('../controllers/checkins_ctr.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

/* The checkin endpoint.
*  expects /checkins?card_number=########*/
router.get('/checkins', async function (req, res) {
  let response_msg;
  if(req.query.card_number) {
    response_msg = await checkins_ctr.checkin(req.query.card_number)
  } else {
    response_msg = "Please send a valid card_number."
  }
  res.send(response_msg)
})

module.exports = router
