import { Button, Container, Dialog, DialogTitle, Grid, TextField } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { backend_base_url } from '../../../Constants'
import { dialogContainer, dialogInnerContainer } from './InvoicePopUp-tempStyles'
import { btnStyle, pageTitle, statsBig, statsSmall } from '../styles'
import axios from 'axios'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { Box } from '@mui/system'
import Loading from '../../../assets/Loading.gif'

const InvoicePopUpSend = (props) => {
    const { onClose, open, name, content } = props
    const { promiseInProgress } = usePromiseTracker()

    const handleSendInvoice = (event) => {
        event.preventDefault()

        // Get form data
        const data = new FormData(event.currentTarget)
        const invoiceTitle = data.get('invoiceTitle')
        const recipientEmail = data.get('recipientEmail')
        const mailContent = data.get('mailContent')
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDkxMzgyMzYxM2UzYTBjNjU2ZmQ4NiIsImVtYWlsIjoic2VuZzIwMjFlY2xhaXJAZ21haWwuY29tIiwiaWF0IjoxNjQ4OTU2NTQxfQ.MMog2AH6wNo7RRW5M3oy_0WGA4Kl5oj7rv0p6CrpXVw"
        const file = content
        let body = { token, invoiceTitle, mailContent, recipientEmail, file }

        const invoice_send_url = backend_base_url + 'invoice/send'

        trackPromise(
            axios({
                method: 'POST',
                url: invoice_send_url,
                data: body,
            })
                .then((data) => {
                    console.log(data)
                    if (data.data.response_code === 200) {
                        toast(`Email sent to ${recipientEmail}`)
                    } else {
                        toast("ERROR!! Please check your input is correct and try again!")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast("Could not connect to server.")
                })
        )
    }

    return (
        <Dialog onClose={onClose} open={open} maxWidth='lg' sx={dialogContainer}>
            <Container sx={dialogInnerContainer}>
                <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Grid item>
                        <DialogTitle sx={pageTitle}>{`Send invoice created for customer: ${name}`}</DialogTitle>
                    </Grid>
                    <Grid item>
                        <DialogTitle sx={{ ...statsBig, p: 0, m: 0 }}>Enter details here</DialogTitle>
                    </Grid>
                    <Grid item style={{ width: "50%" }}>
                        <Box component="form" onSubmit={handleSendInvoice}>
                            <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>
                                <Grid item xs={12}>
                                    <TextField variant='standard' required label="Recipient Email" name="recipientEmail" id="recipientEmail" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField variant='filled' required label="Subject" name="invoiceTitle" id="invoiceTitle" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField multiline rows={2} variant='filled' required label="Message" name="mailContent" id="mailContent" />
                                </Grid>
                                <Grid item xs={12}>
                                    {promiseInProgress && <img src={Loading} style={{ height: "100px", width: "133px" }} alt="loading invoices"></img>}
                                    {!promiseInProgress && <Button type="submit" sx={{ ...btnStyle }}>Send Invoice</Button>}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}

export default InvoicePopUpSend