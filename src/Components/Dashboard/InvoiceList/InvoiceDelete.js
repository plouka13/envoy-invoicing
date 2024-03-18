import { Button, Dialog, DialogTitle } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { toast } from 'react-toastify'
import { backend_base_url } from '../../../Constants'
import { dialogContainer } from './InvoicePopUp-tempStyles'
import { btnStyle, deleteBtnStyle, pageTitle } from '../styles'

const InvoiceDelete = (props) => {
    const { onClose, open, id, invoiceStates } = props
    const token = localStorage.getItem('user')

    const handleDeleteInvoice = () => {
        callDeleteInvoice()
    }

    const callDeleteInvoice = async () => {
        onClose()

        const invoice_delete_url = backend_base_url + 'invoice/delete'
        const config = {
            headers: {
                token,
                invoice_id: id,
            },
        }

        const delete_invoice = trackPromise(
            axios
                .delete(invoice_delete_url, config)
                .then((data) => {
                    return data
                })
                .catch((error) => {
                    console.log(error)
                    toast('Could not connect to server.')
                })
        )

        let response = await delete_invoice
        if (response.data === `Successfully deleted invoice ${id}`) {
            toast('Successfully deleted invoice!')
            invoiceStates.setRefreshInvoices(true)
        } else {
            toast('ERROR!! Please check your input is correct and try again!')
        }
    }

    return (
        <Dialog onClose={onClose} open={open} maxWidth='lg' sx={dialogContainer}>
            <DialogTitle>Are you sure you want to delete this invoice?</DialogTitle>
            <Button
                style={{ ...deleteBtnStyle, borderRadius: 0 }}
                onClick={handleDeleteInvoice}
            >
                Yes, please delete it.
            </Button>
            <Button style={{ ...btnStyle, borderRadius: 0 }} onClick={onClose}>
                No! I want to hold on to it.
            </Button>
        </Dialog>
    )
}

export default InvoiceDelete
