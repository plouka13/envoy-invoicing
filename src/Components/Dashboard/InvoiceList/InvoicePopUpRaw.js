import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { dialogContainer, dialogInnerContainer } from './InvoicePopUp-tempStyles'
import { Container, Grid, IconButton, Typography } from '@mui/material'
import { pageTitle, statsSmall } from '../styles'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function InvoicePopUpRaw(props) {
  const { onClose, open, name, content } = props

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/xml"
    });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.xml`;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <Dialog onClose={onClose} open={open} maxWidth='lg' sx={dialogContainer}>
      <Container sx={dialogInnerContainer}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogTitle sx={pageTitle}>{name}</DialogTitle>
          </Grid>
          <Grid item>
            <Grid container sx={pageTitle} justifyContent="center" alignItems="center">
              <Typography variant='h6'>Download file</Typography>
              <IconButton onClick={downloadTxtFile}>
                <FileDownloadIcon fontSize='medium' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Container sx={statsSmall}>
          {content}
        </Container>
      </Container>
    </Dialog>
  )
}
