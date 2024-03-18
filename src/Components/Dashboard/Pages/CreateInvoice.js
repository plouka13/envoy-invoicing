import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { trackPromise } from 'react-promise-tracker'
import axios from 'axios'
import { backend_base_url } from '../../../Constants'
import { CreateInvoiceItems } from '../InvoiceCreate/CreateInvoiceItems'
import { FailAlert, SuccessAlert } from '../../Landing/Constants'
import { LoadingIndicatorCreateInvoice } from '../constants'
import { pageTitle } from '../styles'
import { CreateInvoiceInputFields, CreateInvoiceBodyPreFilled } from '../InvoiceCreate/CreateInvoiceFields'

export const CreateInvoice = () => {
    const [alertFail, setFailAlert] = useState(false);
    const [alertSuccess, setSuccessAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const token = localStorage.getItem('user')
    const email = localStorage.getItem('email')

    const handleSubmit = (event) => {
        event.preventDefault();
        resetAlerts();

        const data = new FormData(event.currentTarget);

        let body_details = {
            token,
            "invoice_data": CreateInvoiceBodyPreFilled
        };

        // get all input from form
        CreateInvoiceInputFields.forEach((field) => {
            body_details["invoice_data"][field] = data.get(field)
        });

        // fields with same values as other fields
        body_details["invoice_data"]["ID"] = Number(body_details["invoice_data"]["InvoiceID"])

        body_details["invoice_data"]["InvoicePriceAmount"] = Number(body_details["invoice_data"]["PayableAmount"])
        body_details["invoice_data"]["InvoiceLineExtension"] = Number(body_details["invoice_data"]["PayableAmount"])
        body_details["invoice_data"]["LegalLineExtension"] = Number(body_details["invoice_data"]["PayableAmount"])

        body_details["invoice_data"]["InvoiceBaseQuantity"] = Number(body_details["invoice_data"]["InvoiceQuantity"])

        // ensure these fields are numerical
        body_details["invoice_data"]["InvoiceID"] = Number(body_details["invoice_data"]["InvoiceID"]);
        body_details["invoice_data"]["TaxID"] = Number(body_details["invoice_data"]["TaxID"]);
        body_details["invoice_data"]["SupplierPost"] = Number(body_details["invoice_data"]["SupplierPost"]);
        body_details["invoice_data"]["CustomerPost"] = Number(body_details["invoice_data"]["CustomerPost"]);
        body_details["invoice_data"]["TaxAmount"] = Number(body_details["invoice_data"]["TaxAmount"]);
        body_details["invoice_data"]["TaxableAmount"] = Number(body_details["invoice_data"]["TaxableAmount"]);
        body_details["invoice_data"]["LegalLineExtension"] = Number(body_details["invoice_data"]["LegalLineExtension"]);
        body_details["invoice_data"]["TaxExclusiveAmount"] = Number(body_details["invoice_data"]["TaxExclusiveAmount"]);
        body_details["invoice_data"]["TaxInclusiveAmount"] = Number(body_details["invoice_data"]["TaxInclusiveAmount"]);
        body_details["invoice_data"]["PayableAmount"] = Number(body_details["invoice_data"]["PayableAmount"]);
        body_details["invoice_data"]["InvoiceQuantity"] = Number(body_details["invoice_data"]["InvoiceQuantity"]);
        body_details["invoice_data"]["InvoiceLineExtension"] = Number(body_details["invoice_data"]["InvoiceLineExtension"]);
        body_details["invoice_data"]["InvoicePriceAmount"] = Number(body_details["invoice_data"]["InvoicePriceAmount"]);
        body_details["invoice_data"]["InvoiceBaseQuantity"] = Number(body_details["invoice_data"]["InvoiceBaseQuantity"]);

        // console.log(body_details["invoice_data"])

        const create_url = backend_base_url + 'invoice/create'

        trackPromise(
            axios({
                method: 'POST',
                url: create_url,
                data: body_details,
            })
                .then((data) => {
                    let msg = data.data.msg
                    setAlertContent(msg)

                    if (msg === `Successfully created and stored invoice for ${email}`) {
                        setSuccessAlert(true)
                    } else {
                        setFailAlert(true)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setAlertContent(
                        'An unknown error occured, please try again another time.'
                    )
                    setFailAlert(true)
                })
        )
    }

    const resetAlerts = (event) => {
        setFailAlert(false)
        setSuccessAlert(false)
    }

    return (
        <>
            <Typography component="h1" variant="h5" fontFamily="Montserrat" fontWeight="700" alignItems="flex-start" marginBottom="10px" sx={pageTitle}>
                Create Invoice
            </Typography>
            <Box component="form" onChange={resetAlerts} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <CreateInvoiceItems alertSuccess={alertSuccess} />

                <FailAlert alertFail={alertFail} alertContent={alertContent} />
                <SuccessAlert alertSuccess={alertSuccess} alertContent={alertContent} />
                <LoadingIndicatorCreateInvoice success={alertSuccess} />
            </Box>
        </>
    )
}
