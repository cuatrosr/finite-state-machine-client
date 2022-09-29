import {Typography, Box} from '@mui/material'

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'David Montaño - Santiago Arevalo | '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer" style={{position: 'relative', bottom: 0, left: 0, right: 0}}>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Informatica Teorica | Universidad ICESI
            </Typography>
            <Copyright/>
        </Box>
    );
}

export default Footer