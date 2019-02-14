const schedules = require('../model/schedules.js')

// Add a new schedule
exports.addSchedule = async function (data) {
    let term = data.term + " " + data.year
    let result = await schedules.addSchedule(data.sid, term, data.day, data.intime, data.outtime)
    return result.changes == 1
}

// TODO: Lookup the schedule

// For volunteer in volunteers:
// while current < end:
// vol.day[current] += vol.name
