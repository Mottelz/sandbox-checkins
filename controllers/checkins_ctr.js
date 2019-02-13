const moment = require('moment')
const volunteers = require('../model/volunteers.js')
const checkins = require('../model/checkins.js')

/* The function that checks people in. All of the related rules will go here.*/
 exports.checkin = async function (card_number) {
     let result_msg
     //get volunteer's id
     let volunteer_id = await volunteers.getVolunteerId(card_number)
     //get the most recent checkin
     let most_recent_checkin = await checkins.getLastCheckin(volunteer_id)
     console.log(most_recent_checkin)
     //verify that a new checkin is allowed
     if (most_recent_checkin == null || moment(most_recent_checkin.checkintime, "x").isBefore(moment().utc().subtract(1,'hours'))) {
         //check the volunteer in
         await checkins.addCheckin(volunteer_id)
         result_msg = "Checkin Successful!"
     } else {
         console.log("false")
         result_msg = "You can't checkin twice in one hour!"
     }
     console.log(result_msg)
     return result_msg
}
