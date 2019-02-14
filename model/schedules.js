const sqlite3 = require('better-sqlite3')
const db = new sqlite3('model/sandbox.db', { verbose: console.log })

// Get all schedules for a given term
exports.getSchedulesByTerm = async function(term) {
    let stmnt = db.prepare('SELECT * FROM Schedules WHERE term=?')
    let data = await stmnt.all(term)
    return data
}

// Add some new hours
exports.addSchedule = async function (sid, term, day, intime, outtime) {
    let stmnt = db.prepare('INSERT INTO Schedules(sid, term, day, intime, outtime) VALUES(?, ?, ?, ?, ?)')
    let info
    try {
        info = await stmnt.run(sid, term, day, intime, outtime)
    } catch (e) {
        console.log(e.stack)
        return {changes: 0}
    }
    return info
}