const sqlite3 = require('better-sqlite3')
const db = new sqlite3('model/sandbox.db', { verbose: console.log })

// Add a new volunteer
exports.addVolunteer = async function(fname, lname, sid, email) {
    let stmnt = db.prepare('INSERT INTO Volunteers(fname, lname, sid, email) VALUES(?, ?, ?, ?)')
    return await stmnt.run(fname, lname, sid, email)
}

// Get the id based on card number
exports.getVolunteerId = async function(card_number) {
    let stmnt = db.prepare("SELECT sid FROM Cards WHERE cid=?")
    return await stmnt.get(card_number).sid
}

// Get the names of volunteers working on projects
exports.getWorkingVolunteers = async function() {
    let stmnt = db.prepare('SELECT v.fname fname, w.pid pid, w.sid sid FROM working w, volunteers v WHERE w.sid=v.sid')
    return await stmnt.all()
}