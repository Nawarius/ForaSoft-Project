import React from 'react'
import {Button, Grid, TextField, Typography} from '@material-ui/core'
import Dialog from './Dialog'
import { NavLink } from 'react-router-dom'


const JoinRoom = ({changeHandle, roomName, name}) => {
    return <>
        <Grid container alignItems = 'center' justify = 'center' style = {{height:'100%'}} spacing = {3}>
            <Grid container direction = 'column' alignItems = 'center' justify = 'center' style = {{border:'1px solid red', position:'relative', height:'40%', width:'20%'}}>
                <TextField label = 'Ваше имя' name = 'name' style = {{margin:'20px'}} variant = 'outlined' onChange = {changeHandle} value = {name}/>
                <Dialog />
                <Button disabled = {!name || !roomName} color = 'primary' variant = 'contained' style = {{margin:'20px'}}>
                    <NavLink to = {'room/' + roomName} style ={{textDecoration:'none', color:'inherit'}}>Присоедениться</NavLink>
                </Button>
            </Grid>
        </Grid>
    </>
}

export default JoinRoom