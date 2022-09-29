import {TextField} from '@mui/material'
import * as React from 'react'

const ATextField = ({name, label, value, handleChange, type}) => {
    return (
        <TextField name={name} label={label} fullWidth value={value} type={type} onChange={handleChange} style={{width: '100%'}} color={"secondary"}/>
    )
}

export default ATextField