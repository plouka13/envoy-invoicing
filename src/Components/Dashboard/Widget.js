import React from 'react'
import { Paper, Typography, Grid } from '@mui/material'
import { cardHeader } from './styles'
// styles
import './Widget.css'

export default function Widget({
    children,
    title,
    noBodyPadding,
    bodyClass,
    header,
    noHeaderPadding,
    headerClass,
    style,
    noWidgetShadow,
    icon,
    minWidth,
    ...props
}) {

    // local

    return (
        <div className='widgetWrapper' style={style && { ...style }}>
            <Paper className={noWidgetShadow ? 'paper widgetRoot' : 'paper widgetRoot noWidgetShadow'}>
                <div className='widgetHeader'>
                    {header ? (
                        header
                    ) : (
                        <React.Fragment>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={12} lg={10} xl={8}>
                                    <Typography variant='h5' color='textSecondary' noWrap style={cardHeader}>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} xl={4}>
                                    {icon}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
                </div>
                <div className={'widgetBody' + (noBodyPadding ? ' noPadding' : '') + (bodyClass ? ' bodyClass' : '')}>{children}</div>
            </Paper>
        </div>
    )
}
