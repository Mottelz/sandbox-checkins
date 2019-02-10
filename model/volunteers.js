const db = require('better-sqlite3')('sandbox.db')
const moment = require('moment')

//Get the id based on card number
exports.getVolunteerId = async function(card_number) {
    let response = await db.prepare("SELECT sid FROM Cards WHERE cid=?").get(card_number)
    return response.sid
}

//TODO: Get the schedule for a given volunteer
exports.getVolunteerSchedule = function(volunteer_id) {

}

//TODO: Get the schedule for all the volunteers for a given semester
exports.getFullSchedule = function(semester) {

}

//TODO: Get the most recent checkin for a volunteer
exports.getLastCheckin = function(volunteer_id) {

}

//Add a checkin for a volunteer
exports.addCheckin = async function (volunteer_id) {
    let response = await db.prepare("INSERT INTO Swipes (sid, checkintime) VALUES (?, ?)").run(volunteer_id, moment())
    return response
}