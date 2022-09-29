import {validateStringValue} from '../validation/validateMachine'

export const adapterFromClient = (rows, columns, alphabet, isMoore) => {
    let alph = alphabet.split(',')
    let response = {initialState: rows.at(0).States, stimulus: alph, states : []}
    if (isMoore) {
        rows.map(row => {
            let json = {root: row.States, response: row.S, states: []}
            for (const [key, value] of Object.entries(row)) {
                if (key !== 'id' && key !== 'States' && key !== 'S') {
                    json.states.push(validateStringValue(value))
                }
            }
            return response.states.push(json);
        })
    } else {
        rows.map(row => {
            let json = {root: row.States, states: []}
            for (const [key, value] of Object.entries(row)) {
                if (key !== 'id' && key !== 'States') {
                    let state = {state: validateStringValue(value.split(',').at(0)), response: value.split(',').at(1)}
                    json.states.push(state)
                }
            }
            return response.states.push(json);
        })
    }
    return response
}

export const adapterFromServer = (json, isMoore) => {
    let dot = 'rankdir=LR\n'
    if (isMoore) {
        const map = new Map();
        json.states.forEach(s => {
            if (!map.has(s.root)) {
                map.set(s.root, `${s.root},${s.response}`);
            }
        });
        dot += `"${map.get(json.initialState)}" [shape=circle, color=red]\n`;
        json.states.forEach(state => {
            dot += `"${map.get(state.root)}" [shape=circle]\n`
            for (let i = 0; i < json.stimulus.length; i++) {
                dot += `"${map.get(state.root)}" -> "${map.get(state.states.at(i))}" [label="${json.stimulus.at(i)}"]\n`
            }
        });
    } else {
        dot += `${json.initialState} [shape=circle, color=red]\n`;
        json.states.forEach(state => {
            dot += `${state.root} [shape=circle]\n`
            state.states.forEach(s => {
                dot += `${state.root} -> ${s.state} [label="${json.stimulus.at(state.states.indexOf(s))}|${s.response}"]\n`;
            })
        });
    }
    return dot
}

