import React, { useState } from 'react'
import Button from '@mui/material/Button'
import InvoicePopUpRaw from './InvoicePopUpRaw'
import { TableCell } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import { btnStyle, btnStyle2, grey_icons, success } from '../styles'
import InvoicePopUpSend from './InvoicePopUpSend';
import InvoiceDelete from './InvoiceDelete';
import axios from 'axios';
import { backend_base_url } from '../../../Constants';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

export default function InvoiceOptions(props) {
  // FOR RAW INVOICES
  const [openRawDialog, setOpenRawDialog] = useState(false)
  function handleOpen() {
    setOpenRawDialog(true)
  }

  // FOR SENDING INVOICES
  const [openSendDialog, setOpenSendDialog] = useState(false)
  function handleOpenSend() {
    setOpenSendDialog(true)
  }

  // FOR DELETING INVOICES
  const [deleteDialog, setDeleteDialog] = useState(false)
  function handleDelete() {
    setDeleteDialog(true)
  }

  // Close Dialogs
  const handleClose = () => {
    setOpenRawDialog(false)
    setOpenSendDialog(false)
    setDeleteDialog(false)
  }

  // download HTML file for invoice Render
  const token = localStorage.getItem('user')
  const { promiseInProgress } = usePromiseTracker()

  const downloadRenderedInvoice = () => {
    let render_url = backend_base_url + 'invoice/render'
    let body = {}
    let config = {
      headers: {
        token,
        "invoice_id": props.invoice_id
      }
    }

    trackPromise(axios.post(render_url, body, config)
      .then((data) => {
        const element = document.createElement("a");
        const file = new Blob([data.data.content], {
          type: "text/HTML"
        });
        element.href = URL.createObjectURL(file);
        element.download = `${props.customerName}.html`;
        document.body.appendChild(element);
        element.click();
      })
    )
  }

  return (
    <>
      {/* FOR SHOWING RAW INVOICES */}
      <TableCell sx={props.styleObj}>
        <Button sx={btnStyle2} variant="standard" size='small' onClick={handleOpen}>View Raw XML</Button>
      </TableCell>
      {openRawDialog ? (
        <InvoicePopUpRaw
          onClose={handleClose}
          open={openRawDialog}
          content={props.content}
          name={props.customerName}
        />
      ) : null}

      {/* FOR RENDERING HTMl INVOICES */}
      <TableCell sx={props.styleObj}>
        <Button sx={btnStyle2} variant="standard" size='small' onClick={downloadRenderedInvoice} disabled={promiseInProgress}>Download Invoice</Button>
      </TableCell>

      {/* FOR SENDING INVOICES */}
      <TableCell sx={props.styleObj}>
        <Button sx={btnStyle2} variant="standard" size='small' onClick={handleOpenSend}>Send Invoice</Button>
      </TableCell>
      {openSendDialog ? (
        <InvoicePopUpSend
          onClose={handleClose}
          open={openSendDialog}
          content={props.content}
          name={props.customerName}
        />
      ) : null}

      {/* FOR DELETING INVOICES */}
      <TableCell sx={props.styleObj}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon sx={{ color: grey_icons.color }} />
        </IconButton>
      </TableCell>
      {deleteDialog ? (
        <InvoiceDelete
          onClose={handleClose}
          open={deleteDialog}
          id={props.invoice_id}
          invoiceStates={props.invoiceStates} />
      ) : null}
    </>
  )
}
