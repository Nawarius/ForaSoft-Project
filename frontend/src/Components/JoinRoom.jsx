import React from 'react'
import {Button, Grid, TextField, Typography} from '@material-ui/core'
import Dialog from './Dialog'

const JoinRoom = () => {
    return <>
        <Grid container alignItems = 'center' justify = 'center' style = {{height:'100%'}} spacing = {3}>
            <Grid container direction = 'column' alignItems = 'center' justify = 'center' style = {{border:'1px solid red', position:'relative', height:'40%', width:'20%'}}>
                <TextField label = 'Ваше имя' style = {{margin:'20px'}} variant = 'outlined' />
                <Dialog />
                <Button color = 'primary' variant = 'contained' style = {{margin:'20px'}}>Присоедениться</Button>
            </Grid>
        </Grid>
    </>
}

export default JoinRoom