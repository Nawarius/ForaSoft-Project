import React from 'react'
import {Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import Dialog from './Dialog'
import { NavLink } from 'react-router-dom'


const JoinRoom = ({changeHandle, roomName, name}) => {
    return <>
            <Grid container alignItems = 'center' justify = 'center' style = {{height:'100%', width:'100%'}} >
                <Grid container style = {{height:'40%', width:'20%'}}>
                    <Paper elevation = {20} style = {{ width:'100%'}}>
                        <Grid container direction = 'column' alignItems = 'center' justify = 'center' style = {{position:'relative', height:'100%'}}>
                            <TextField label = 'Ваше имя' name = 'name' style = {{margin:'20px'}} variant = 'outlined' onChange = {changeHandle} value = {name}/>
                            <Dialog />
                            <Button disabled = {!name || !roomName} color = 'primary' variant = 'contained' style = {{margin:'20px'}}>
                                <NavLink to = {'/' + roomName} style ={{textDecoration:'none', color:'inherit'}}>Присоедениться</NavLink>
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
    </>
}

export default JoinRoom