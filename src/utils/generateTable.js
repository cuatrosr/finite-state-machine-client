export function generateColumns(alphabet, isMoore) {
    let columns = []
    columns[0] = { field: 'States', width: 200 }
    for (let index = 1; index < alphabet.length + 1; index++) {
        columns[index] = { field: alphabet[index - 1].toString(), headerName: alphabet[index - 1], width: 180, editable: true };
    }
    if (isMoore) {
        columns[alphabet.length + 1] = { field: 'S', headerName: 'Respuesta', type:'number', width: 180, editable: true }
    }
    return columns
}

export const generateRows = (columns, amountOfStates) => {
    let rows = []
    for (let i = 0; i < amountOfStates; i++) {
        let row = { id: i + 1 }
        for (let j = 0; j < columns.length; j++) {
            row[columns[j].field] = (j === 0) ? (String.fromCharCode(65 + i)) : ''
        }
        rows[i] = row
    }
    return rows
}