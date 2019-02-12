function cleanCardID() {
    document.forms[0].cid.value = document.forms[0].cid.value.replace(';', '')
    document.forms[0].cid.value = document.forms[0].cid.value.replace('?', '')
}