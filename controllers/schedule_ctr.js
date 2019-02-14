const schedules = require('../model/schedules.js')

// Add a new schedule
exports.addSchedule = async function (data) {
    let term = data.term + " " + data.year
    let result = await schedules.addSchedule(data.sid, term, data.day, data.intime, data.outtime)
    return result.changes == 1
}

// Lookup the schedule
exports.getSchedule = async function (term) {

    let records = await schedules.getSchedulesByTerm(term)
    // Drawing this out so that:
    // 1. It makes sense
    // 2. Every field as a string so that the template renders correctly.
    let caldata = {
        "10": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "11": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "12": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "13": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "14": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "15": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "16": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "17": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""},
        "18": {"sun":"","mon":"", "tue":"", "wed": "", "thu":"", "fri":"", "sat":""}
    }

    records.forEach((record)=>{
        for (time = Number(record.intime); time < Number(record.outtime); time++) {
            caldata[time][record.day] += record.fname + ", "
        }
    })

    //This needs to be done because handlebars won't read a number as a key.
    //TODO: Replace Handlebars.
    let result = {
        "10x": caldata["10"],
        "11x": caldata["11"],
        "12x": caldata["12"],
        "13x": caldata["13"],
        "14x": caldata["14"],
        "15x": caldata["15"],
        "16x": caldata["16"],
        "17x": caldata["17"],
        "18x": caldata["18"]
    }


    return result
}

// For volunteer in volunteers:
// while current < end:
// vol.day[current] += vol.name
