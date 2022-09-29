import * as React from 'react'
import {CssBaseline} from '@mui/material'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {DataGrid} from '@mui/x-data-grid'
import SendIcon from '@mui/icons-material/Send'
import {generateColumns, generateRows} from './utils/generateTable'
import SimpleAppBar from './components/SimpleAppBar'
import Footer from './components/Footer'
import ASelect from './components/ASelect'
import AButton from './components/AButton'
import ATextField from './components/ATextField'
import Graphviz from 'graphviz-react'
import { SnackbarProvider } from 'notistack'

const theme = createTheme()

function App() {
    const [dataTable, setDataTable] = React.useState({columns: [], rows: []})
    const [machine, setMachine] = React.useState({typeMachine: '', amountOfStates: 0, alphabet: ''});
    const [open, setOpen] = React.useState(false)
    const [diagramData, setDiagramData] = React.useState()
    React.useEffect(() => {
        setOpen(validateBeforeShowMachineTable())
    }, [machine])// eslint-disable-line react-hooks/exhaustive-deps

    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setMachine({...machine, [name]: value});
    };

    const processRowUpdate = React.useCallback(
        (newRow) =>
            new Promise((resolve) => {
                setDataTable({
                    ...dataTable, rows: [
                        ...dataTable.rows.slice(0, newRow.id - 1),
                        newRow,
                        ...dataTable.rows.slice(newRow.id, dataTable.rows.length)
                    ]
                })
                resolve(newRow)
            }),
        [dataTable],
    );

    const validateBeforeShowMachineTable = () => {
        if (machine.typeMachine !== '' && machine.amountOfStates > 0 && machine.alphabet !== '') {
            const columns = generateColumns(machine.alphabet.split(','), machine.typeMachine === 'Moore')
            const rows = generateRows(columns, machine.amountOfStates)
            setDataTable({...dataTable, columns, rows})
            return true
        }
        return false
    }

    const handleDiagramData = (data) => {
        setDiagramData(data)
    }

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline/>
                <SimpleAppBar/>
                <main>
                    <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                Maquina de Estado Finita
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Something short and leading about the collection below—its contents,
                                the creator, etc. Make it short and sweet, but not too short so folks
                                don't simply skip over it entirely.
                            </Typography>
                        </Container>
                    </Box>
                    <Container sx={{flexGrow: 1}} maxWidth={"md"}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <ASelect name={'typeMachine'} machine={machine.typeMachine}
                                         handleChange={handleFieldChange}></ASelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ATextField name={'alphabet'} label={'Alfabeto'} value={machine.alphabet}
                                            handleChange={handleFieldChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ATextField name={'amountOfStates'} label={'Cantidad de estados'} type={'number'}
                                            value={machine.amountOfStates} handleChange={handleFieldChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{display: "flex", alignItems: "center"}}>
                                <AButton dataTable={dataTable} machineType={machine.typeMachine}
                                         handleDiagramData={handleDiagramData} alphabet={machine.alphabet}
                                         isDisable={!open}
                                         name={'Enviar'} endIcon={<SendIcon/>}></AButton>
                            </Grid>
                        </Grid>
                        <Box sx={{pt: 4, height: '300px'}} maxWidth={"md"}>
                            {open && (
                                <DataGrid rows={dataTable.rows} columns={dataTable.columns}
                                          processRowUpdate={processRowUpdate}
                                          experimentalFeatures={{newEditingApi: true}}/>
                            )}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}}>
                            {(diagramData !== '' && diagramData !== undefined) && <Graphviz dot={`
                            digraph {
                            ${diagramData}
                            }
                            `}
                            />}
                        </Box>
                    </Container>
                </main>
                <Footer/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
