function checkFields(fields){
    for (const field of fields) {
        if(field == null || typeof field !== 'string' || field === ''){
            return false;
        }
    }
    return true;
}

function compareDate(start_datetime, end_datetime){
    const startDate = new Date(start_datetime);
    const endDate = new Date(end_datetime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
            success: false,
            message: 'Format datetime tidak valid'
        };
    }

    if (endDate <= startDate) {
        return {
            success: false,
            message: 'Tanggal akhir harus lebih besar dari tanggal mulai'
        };
    }

    return {
        success: true,
        message: 'Tanggal valid'
    };
}

function trimFields(fields) {
    for (const key in fields) {
        if (typeof fields[key] === 'string') {
            fields[key] = fields[key].trim();
        }
    }
    return fields;
}

module.exports = {
    checkFields,
    compareDate,
    trimFields,
}