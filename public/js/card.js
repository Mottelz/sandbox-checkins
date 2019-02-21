function cleanCardID() {
    document.forms[0].cid.value = document.forms[0].cid.value.replace(';', '')
    document.forms[0].cid.value = document.forms[0].cid.value.replace('?', '')
}

function cleanCardAndSubmit() {
    document.getElementById('checkin-form').card_number.value = document.getElementById('checkin-form').card_number.value.replace(';', '')
    document.getElementById('checkin-form').card_number.value = document.getElementById('checkin-form').card_number.value.replace('?', '')
    if(cid.length == 12) {
        console.log(document.getElementById('checkin-form').card_number.value)
        document.getElementById('checkin-form').submit()
    }
}