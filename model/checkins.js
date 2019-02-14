const db = require('better-sqlite3')('model/sandbox.db')
const moment = require('moment')

// Add a checkin for a volunteer
exports.getLastCheckin  = async function(volunteer_id) {
    let stmnt = db.prepare("SELECT checkintime FROM Checkins WHERE sid=? ORDER BY checkintime DESC")
    return await stmnt.get(volunteer_id)
}

// Get the most recent checkin for a volunteer
exports.addCheckin = async function (volunteer_id) {
    let stmnt = db.prepare("INSERT INTO Checkins(sid, checkintime) VALUES(?, ?)")
    return await stmnt.run(volunteer_id, moment.utc().format("x"))
}

// TODO: Get all checkins for a volunteer
exports.getAllCheckins = async function (volunteer_id) {
    let stmnt = db.prepare("SELECT * FROM Checkins WHERE sid=?")
    return await stmnt.run(volunteer_id, moment.utc().format("x"))
}