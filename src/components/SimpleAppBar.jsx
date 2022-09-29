import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AdfScannerIcon from '@mui/icons-material/AdfScanner'

const SimpleAppBar = () => {
    return (
        <AppBar position="relative" color="secondary">
            <Toolbar>
                <AdfScannerIcon sx={{mr: 2}}/>
                <Typography variant="h6" color="inherit" noWrap>
                    Maquina de Estado Finita
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default SimpleAppBar;