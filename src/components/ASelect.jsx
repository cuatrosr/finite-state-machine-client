import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

const ASelect = ({name, handleChange, machine}) => {
    return (
        <FormControl style={{width: '100%'}} fullWidth>
            <InputLabel id='select-type-machine' color={'secondary'}>Selecciona tu maquina</InputLabel>
            <Select labelId={'select-type-machine'} value={machine} name={name} color={'secondary'} label='Selecciona tu maquina' onChange={handleChange}>
                <MenuItem value={'Moore'}>Moore</MenuItem>
                <MenuItem value={'Mealy'}>Mealy</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ASelect