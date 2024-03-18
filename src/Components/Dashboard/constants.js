import React from "react"
import { Button } from '@mui/material'
import { usePromiseTracker } from "react-promise-tracker"
import loadingImage from '../../assets/Loading.gif'
import { toast } from "react-toastify"
import { btnStyle } from "./styles"

// Login functions
const SubmitContentCreateInvoice = (props) => {
    return (
        <React.Fragment>
            <Button
                type='submit'
                fullWidth
                variant='contained'
                fontFamily='Montserrat'
                sx={{ mt: 3, mb: 2, ...btnStyle }}
            >
                Create Invoice
            </Button>
        </React.Fragment>
    )
}

export const LoadingIndicatorCreateInvoice = (props) => {
    const { promiseInProgress } = usePromiseTracker()

    return promiseInProgress ? (
        <img
            src={loadingImage}
            style={{ position: 'center', height: '100px', width: '133px' }}
            alt=''
        />
    ) : (
        <div>
            <SubmitContentCreateInvoice />
            {props.success && toast("Successfully created invoice")}
        </div>

    )
}