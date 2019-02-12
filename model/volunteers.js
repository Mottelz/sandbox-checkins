const sqlite3 = require('better-sqlite3')
const db = new sqlite3('model/sandbox.db', { verbose: console.log })

// Add a new volunteer
exports.addVolunteer = async function(fname, lname, sid, email) {
    let stmnt = db.prepare('INSERT INTO Volunteers(fname, lname, sid, email) VALUES(?, ?, ?, ?)')
    let info = await stmnt.run(fname, lname, sid, email)
    return info
}


// Get the id based on card number
exports.getVolunteerId = async function(card_number) {
    let stmnt = await db.prepare("SELECT sid FROM Cards WHERE cid=?")
    let response = stmnt.get(card_number)
    return response.sid
}

//TODO: Get the schedule for a given volunteer
exports.getVolunteerSchedule = function(volunteer_id) {

}

//TODO: Get the schedule for all the volunteers for a given semester
exports.getFullSchedule = function(semester) {

}

