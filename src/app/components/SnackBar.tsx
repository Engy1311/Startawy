import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface MySnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

export default function MySnackbar({ open, onClose, message }: MySnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert 
                onClose={onClose} 
                severity="success" 
                variant="filled" 
                sx={{ 
                    width: '100%',
                    backgroundColor: "#0D9488", // Teal 600
                    '& .MuiAlert-icon': {
                        color: 'white'
                       
                    },
                    borderRadius: '10px'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
