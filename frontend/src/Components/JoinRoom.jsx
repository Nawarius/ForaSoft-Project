import React from 'react'
import {Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import Dialog from './Dialog'
import { NavLink } from 'react-router-dom'


const JoinRoom = ({changeHandle, roomName, name}) => {
    return <>
            <Grid container alignItems = 'center' justify = 'center' style = {{height:'100%', width:'100%'}}>
                <Grid container xs = {12} sm = {5} md = {2}>
                    <Paper elevation = {20} style = {{ width:'100%'}}>
                        <Grid container direction = 'column' alignItems = 'center' justify = 'center' spacing = {3}>
                            <Grid item xs = {12} style ={{marginTop:'40px'}}>
                                <TextField label = 'Ваше имя' name = 'name'  variant = 'outlined' onChange = {changeHandle} value = {name}/>
                            </Grid>

                            <Grid item xs = {12} > 
                                <Dialog /> 
                            </Grid>

                            <Grid item xs = {12} >
                                <Button disabled = {!name || !roomName} color = 'primary' variant = 'contained' style ={{marginBottom:'20px'}}>
                                    <NavLink to = {'/' + roomName} style ={{textDecoration:'none', color:'inherit'}}>Присоедениться</NavLink>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
    </>
}

export default JoinRoom