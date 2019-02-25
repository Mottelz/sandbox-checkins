const moment = require('moment')
const volunteers = require('../model/volunteers.js')
const checkins = require('../model/checkins.js')

/* The function that checks people in. All of the related rules will go here.*/
 exports.checkin = async function (card_number) {
     let result_msg
     console.log(1)
     //get volunteer's id
     let volunteer_id = await volunteers.getVolunteerId(card_number)
     //if volunteer doesn't exist...
     if (volunteer_id.toString().length !== 8) {
         return 'You are not in the system yet. Please signup.'
     }
     //get the most recent checkin
     let most_recent_checkin = await checkins.getLastCheckin(volunteer_id)
     console.log(most_recent_checkin)
     //verify that a new checkin is allowed
     if (most_recent_checkin == null || moment(most_recent_checkin.checkintime, "x").isBefore(moment().utc().subtract(1,'hours'))) {
         //check the volunteer in
         result_msg = await checkins.addCheckin(volunteer_id)
         if (result_msg == volunteer_id) {
             result_msg = volunteer_id + " has been checked in."
         }
     } else {
         result_msg = "You cannot checkin twice in one hour."
     }
     return result_msg
}
