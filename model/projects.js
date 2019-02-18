const sqlite3 = require('better-sqlite3')
const db = new sqlite3('model/sandbox.db', { verbose: console.log })

// Add a project
exports.addProject = async function (title, description, pid) {
    let stmnt = db.prepare('INSERT INTO Projects(title, description, pid) VALUES (?, ?, ?)')
    return await stmnt.run(title, description, pid)
}

// Add a volunteer to a project
exports.addToProject = async function(sid, pid) {
    let stmnt = db.prepare('INSERT INTO Working(sid, pid) VALUES (?, ?)')
    return await stmnt.run(sid, pid)
}

// Get the most recent project id
exports.getLastID = async function () {
    let stmnt = db.prepare('SELECT pid FROM Projects ORDER BY pid DESC')
    return await stmnt.get()
}

// Get all projects
exports.getAllProjects = async function() {
    let stmnt = db.prepare('SELECT * FROM Projects')
    return await stmnt.all()
}