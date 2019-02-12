const db = require('better-sqlite3')('model/sandbox.db')
const moment = require('moment')

//TODO: Get the most recent checkin for a volunteer
exports.getLastCheckin = async function(volunteer_id) {
    let response = await db.prepare()
}

//Add a checkin for a volunteer
exports.addCheckin = async function (volunteer_id) {
    let response = db.prepare("INSERT INTO Swipes (sid, checkintime) VALUES (?, ?)")
    result = await response.run(volunteer_id, moment())
    return result
}

// Get all checkins for a volunteer
exports.getAllCheckins = async function (volunteer_id) {
    let response = await db.prepare()
}