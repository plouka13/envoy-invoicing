import React from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    TextField,
    Typography,
    IconButton
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { statsSmall } from '../styles'
import HelpIcon from '@mui/icons-material/Help';
import { WarningAlert } from '../../Landing/Constants';

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

const today_date = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`

export const createInvoiceFieldDetails = [
    {
        title: 'Invoice Identification',
        fields: [
            { helperText: '', fieldSize: 2, defaultValue: '', field: 'Invoice ID' },
            { helperText: 'e.g. GST, VAT', fieldSize: 2, defaultValue: 'GST', field: 'Invoice Tax Scheme ID' },
            { helperText: '', fieldSize: 12, defaultValue: '', field: 'Invoice Name' },
            { helperText: `e.g. ${today_date}`, fieldSize: 12, defaultValue: today_date, field: 'Issue Date' },
        ],
    },
    {
        title: 'Payment Details and Costs',
        fields: [
            { helperText: '', fieldSize: 2, defaultValue: '', field: 'Payable Amount' },
            { helperText: 'The quantity (of items) on this invoice line', fieldSize: 2, defaultValue: '0', field: 'Invoice Quantity' },
            { helperText: 'e.g. AUD, USD', fieldSize: 2, defaultValue: 'AUD', field: 'Currency' },
            { helperText: 'Note regarding payment', fieldSize: 4, defaultValue: 'None', field: 'Payment Terms' },
        ],
    },
    {
        title: 'Tax Details',
        fields: [
            { helperText: 'Percentage of money to be taxed', fieldSize: 2, defaultValue: '10', field: 'Tax Amount' },
            { helperText: 'Amount of money taxable', fieldSize: 2, defaultValue: '0', field: 'Taxable Amount' },
            { helperText: 'The monetary amount of a transaction, exclusive of taxes', fieldSize: 2, defaultValue: '0', field: 'Tax Exclusive Amount' },
            { helperText: 'The monetary amount including taxes', fieldSize: 2, defaultValue: '0', field: 'Tax Inclusive Amount' },
            { helperText: 'e.g. GST, VAT', fieldSize: 2, defaultValue: 'GST', field: 'Tax Scheme ID' },
        ],
    },
    {
        title: 'Supplier Details',
        fields: [
            { helperText: 'e.g. Ebusiness Software Services Pty Ltd', fieldSize: 12, defaultValue: '', field: 'Supplier Registration' },
            { helperText: '', fieldSize: 12, defaultValue: 'None', field: 'Supplier Street' },
            { helperText: '', fieldSize: 12, defaultValue: 'None', field: 'Supplier City' },
            { helperText: 'Supplier postcode', fieldSize: 12, defaultValue: '2000', field: 'Supplier Post' },
            { helperText: '', fieldSize: 12, defaultValue: 'Australia', field: 'Supplier Country' },
        ],
    },
    {
        title: 'Customer Details',
        fields: [
            { helperText: 'Customer name', fieldSize: 12, defaultValue: '', field: 'Customer Registration' },
            { helperText: '', fieldSize: 12, defaultValue: 'None', field: 'Customer Street' },
            { helperText: '', fieldSize: 12, defaultValue: 'None', field: 'Customer City' },
            { helperText: 'Customer postcode', fieldSize: 12, defaultValue: '2000', field: 'Customer Post' },
            { helperText: '', fieldSize: 12, defaultValue: 'Australia', field: 'Customer Country' },
        ],
    },
]

export const CreateInvoiceItems = (props) => {
    const helpDocLink = "https://docs.google.com/document/d/1WfJrTTRJeruLsx5I3j196V5kC6ypWAOCQ6h2ayyQqxM/edit?usp=sharing"

    return (
        <div>
            <Grid container spacing={2}>
                {createInvoiceFieldDetails.map((sectionObj, idx) => (
                    <Grid item xs={12} key={`header-${idx}`}>
                        <Accordion sx={{ width: '100%', margin: "0.25rem" }}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Grid container display="flex" justifyContent="left" alignItems="center" sx={{ marginTop: "1vw" }}>
                                    <Grid item>
                                        <Typography variant='h5' sx={{ ...statsSmall, fontWeight: "400" }}>{sectionObj.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <a href={helpDocLink} target="_blank" rel="noreferrer noopener" style={{ color: "gray", textTransform: "none", textDecoration: "none" }}>
                                                <HelpIcon fontSize="small" />
                                            </a>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container justifyContent="left" alignItems="left" spacing={4}>
                                    {sectionObj.fields.map((field_obj, field_idx) => (
                                        <React.Fragment>
                                            <Grid item style={{ margin: "0.2rem" }} sm={(field_obj.fieldSize === 12 ? field_obj.fieldSize : field_obj.fieldSize + 4)} md={(field_obj.fieldSize)} key={`grid-item-${idx}-${field_idx}`}>
                                                <TextField required helperText={field_obj.helperText} defaultValue={field_obj.defaultValue} fullWidth variant="standard" name={field_obj.field.replace(/\s+/g, '')} label={field_obj.field} id={field_obj.field.replace(/\s+/g, '')} />
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid >
                ))}
                <Grid item xs={12} md={6}>
                    <WarningAlert alertWarning={!props.alertSuccess} alertContent="Please make sure to fill in all required fields of the form" />
                </Grid>
            </Grid >
        </div >
    )
}
