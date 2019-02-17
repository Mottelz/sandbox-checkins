const sqlite3 = require('better-sqlite3')
const db = new sqlite3('model/sandbox.db', { verbose: console.log })

// Add a card
exports.addCard = async function(cid, sid) {
    let stmnt = db.prepare('INSERT INTO Cards(cid, sid) VALUES(?, ?)')
    return await stmnt.run(cid, sid)
}