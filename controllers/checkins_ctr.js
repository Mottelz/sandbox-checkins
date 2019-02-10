const moment = require('moment')
const volunteers = require('../model/volunteers.js')

/* The function that checks people in. All of the related rules will go here.*/
 exports.checkin = async function (card_number) {
     let result_msg
     //get volunteer's id
     let volunteer_id = await volunteers.getVolunteerId(card_number)
     //get the most recent checkin
     let most_recent_checkin = moment(await volunteers.getLastCheckin(volunteer_id))
     //verify that a new checkin is allowed
     if (moment(most_recent_checkin).isAfter(moment().subtract(1,'hours'))) {
         //check the volunteer in
         await volunteers.addCheckin(volunteer_id)
         result_msg = "Checkin Successful!"
     } else {
         result_msg = "You can't checkin twice in one hour!"
     }

     return result_msg
}
