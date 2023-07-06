import React, {SyntheticEvent} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
import {selectError} from '../../app/selectors';
import {useActions} from "../../hooks/useActions";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ErrorSnackbar = () => {

    const error = useAppSelector(selectError)

    const {setAppError} = useActions()

    const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppError(null)
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
