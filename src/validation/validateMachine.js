export function validateStringValue(value) {
    return (typeof value === 'string') ? value.toUpperCase() : value
}

export function validateMachineData(rows, isMoore) {
    for (const row of rows) {
        for (const [key, value] of Object.entries(row)) {
            if (key !== 'id' && key !== 'States') {
                if (isMoore && value === '') {
                    return false;
                } else if (!isMoore && value.split(',').length !== 2) {
                    return false;
                }
            }
        }
    }
    return true
}
