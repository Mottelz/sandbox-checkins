const projects = require('../model/projects.js')
const volunteers = require('../model/volunteers.js')

// Add a new project
exports.addProject = async function(data) {
    let lastPid = await projects.getLastID().pid
    let pid = (lastPid == null) ? 1 : lastPid+1
    let result = await projects.addProject(data.title, data.description, pid)
    return result.changes == 1
}

// Add a volunteer to a project (new record in the Working table)
exports.addToProject = async function(data) {
    let result = await projects.addToProject(data.sid, data.pid)
    return result.changes == 1
}

// Get all projects (used for the form to add volunteers)
exports.getAllProjects = async function() {
    return await projects.getAllProjects()
}

// Get all projects with volunteer names (used for projects page)
exports.getAllProjectsWithVolunteers = async function() {
    let allProjects = await projects.getAllProjects()
    let workingVolunteers = await volunteers.getWorkingVolunteers()


    // TODO: Make this not n^2
    // Add an empty string to add the attribute
    for(let p = 0; p < allProjects.length; p++ ) {
        allProjects[p].volunteers = ''
        // Add the volunteers to projects
        for (let v = 0; v < workingVolunteers.length; v++) {
            if (workingVolunteers[v].pid == allProjects[p].pid) {
                if (allProjects[p].volunteers.length > 0) {
                    allProjects[p].volunteers += ", "
                }
                allProjects[p].volunteers += workingVolunteers[v].fname
            }
        }
    }

    return allProjects
}