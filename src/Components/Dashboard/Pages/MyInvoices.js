import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { backend_base_url } from '../../../Constants'
import { cardHeader, pageTitle } from '../styles'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../assets/Loading.gif'
import { InvoiceDataTable } from '../InvoiceList/InvoiceDataTable'

export const MyInvoices = (props) => {
  const [invoices, setInvoiceList] = useState({ "created": [], "received": [] })
  const [finishedLoading, setFinishedLoading] = useState(true)
  const [deletedInvoice, setRefreshInvoices] = useState(false)
  const token = localStorage.getItem('user')

  useEffect(() => {
    let isMounted = true
    setFinishedLoading(false)
    fetch(backend_base_url + 'invoice/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setInvoiceList({ "created": data.created_invoices, "received": data.received_invoices })
          setFinishedLoading(true)
        }
      })
    return () => { isMounted = false };
  }, [deletedInvoice])

  const navigate = useNavigate()
  function handleLinkChange() {
    props.changeLinkState({ ...props.activeLink, activeItem: props.item })
    navigate('/dashboard/create')
  }

  return (
    <>
      <Typography
        component='h1'
        fontSize='1.8rem'
        fontFamily='Montserrat'
        sx={pageTitle}
      >
        My Invoices
      </Typography>
      {!finishedLoading && <img src={Loading} style={{ height: "100px", width: "133px" }} alt="loading invoices"></img>}
      {finishedLoading && ((invoices.created.length === 0 && invoices.received.length === 0) ? (
        <React.Fragment>
          <Typography variant='h3' sx={cardHeader}>
            No invoices to display yet. Try creating one.
          </Typography>
          <Button variant="contained" onClick={handleLinkChange} sx={{ textTransform: "none", color: "#F3FFFE", backgroundColor: "#2A9D8F", '&:hover': { backgroundColor: '#2A9D8F' } }}>Create Invoice</Button>
        </React.Fragment>
      ) : (
        <InvoiceDataTable tableData={invoices} invoiceStates={{ setRefreshInvoices }} />
      ))
      }
    </>
  )
}
