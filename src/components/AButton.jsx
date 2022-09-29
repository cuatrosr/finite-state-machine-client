import * as React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import {validateMachineData} from '../validation/validateMachine'
import {adapterFromClient, adapterFromServer} from '../adapter/adapter'
import axios from 'axios'
import {useSnackbar} from 'notistack'

const AButton = ({dataTable, machineType, handleDiagramData, alphabet, isDisable, name, endIcon}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async () => {
        try {
            if (validateMachineData(dataTable.rows, machineType === 'Moore')) {
                setLoading(true)
                const json = adapterFromClient(dataTable.rows, dataTable.columns, alphabet, machineType === 'Moore')
                const headers = {'Content-Type': 'application/json'}
                const response = await axios.post(`http://localhost:8080/machine/${machineType.toLowerCase()}/minimum`, json, {headers: headers})
                setLoading(false)
                handleDiagramData(adapterFromServer(response.data, machineType === 'Moore'))
                enqueueSnackbar('Ve la maquina conexa y minimal abajo 👇', { variant: 'success' })
            } else {
                enqueueSnackbar('Todos los campos son requeridos y en su respectivo formato', { variant: 'warning' })
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Server Error', { variant: 'error' })
            setLoading(false)
        }
    }

    return (
        <LoadingButton disabled={isDisable} style={{width: '100%'}} loading={loading} onClick={handleSubmit} variant="contained" color={"secondary"} endIcon={endIcon}>{name}</LoadingButton>
    )
}

export default AButton