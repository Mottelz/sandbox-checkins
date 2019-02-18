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
    // Drawing this out so that it makes sense to whomever is reading this and it renders properly.
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
            if(caldata[time][record.day].length > 0) {
                caldata[time][record.day] += ", "
            }
            caldata[time][record.day] += record.fname
        }
    })
    return caldata
}
