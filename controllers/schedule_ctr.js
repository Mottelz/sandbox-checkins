const schedules = require('../model/schedules.js')
const moment = require('moment')

// Add a new schedule
exports.addSchedule = async function (data) {
    let term = data.term + " " + data.year
    let result = await schedules.addSchedule(data.sid, term, data.day, data.intime, data.outtime)
    return result.changes == 1
}

// Calculates the current term
exports.getTerm = function () {
    // Get the month. Count starts at 0.
    // e.g. 0 = Jan, 1 = Feb, 2 = Mar, etc.
    let month = moment().month()
    let year = moment().year()
    let term = ''

    //Set the term based on the month.
    if(month >= 4 && month <= 7) {
        term = 'Summer '
    } else if(month >= 8 && month <= 11) {
        term = 'Fall '
    } else if(month >= 0 && month <= 3) {
        term = 'Winter '
    }

    return term + year
}


// Lookup the schedule
exports.getSchedule = async function (term) {

    let records = await schedules.getSchedulesByTerm(term)
    // Drawing this out so that:
    // It makes sense to whomever is reading this.
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
