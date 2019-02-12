const volunteers = require('../model/volunteers.js')

// Add a new volunteer
exports.addVolunteer = async function (data) {
    let result = await volunteers.addVolunteer(data.fname, data.lname, data.sid, data.email)
    return result.changes == 1;
}
