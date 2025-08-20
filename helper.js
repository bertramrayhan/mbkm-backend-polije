function checkFields(fields){
    for (const field of fields) {
        if(field === ''){
            return false;
        }
    }
    return true;
}

module.exports = {
    checkFields,
}