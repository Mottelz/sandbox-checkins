const cards = require('../model/cards.js')

// Add a card
exports.addCard = async function(data) {
    let result = await cards.addCard(data.cid, data.sid)
    return result.changes == 1
}