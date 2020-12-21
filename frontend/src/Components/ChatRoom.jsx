import { Button, Grid, TextField, Typography, Paper, CardMedia, Card } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import React from 'react'
import { NavLink } from 'react-router-dom';

const CharRoomContainer = ({roomName, handleUserMessage, users, changeHandle, callAccepted, receivedCall, caller, acceptCall, handleLeave,
    handleOpenInvite , allMessages, socketRef, userVideoRef, partnerVideofRef, stream, callUser}) => {

    
    const allUsers = users.map(item => {
        return <Grid container direction = 'row' alignItems = 'center' >
                    <PersonIcon />
                    <Typography style ={{margin:'10px'}}>{item.name}</Typography>
                    {socketRef.current.id !== item.id && 
                        <Grid container>
                            <button onClick = {()=>{callUser(item.id)}}>Позвонить</button>
                            <button onClick = {()=>{handleOpenInvite(item.id)}}>Пригласить</button>
                        </Grid>
                    }
                </Grid>
    })
    const callerMan = users.map(user=>{
        if(user.id==caller) return user.name
    })

    const messages = allMessages.map(item => {
        return <Grid container direction = 'column' alignItems = 'left' style ={{width:'100%', height:'15%'}}>
                <Typography>{item.date}</Typography>
                <Typography>{item.sender}:</Typography>
                <Typography>{item.message}</Typography>
            </Grid>
    })
    
    return <> 
        {stream && <video autoPlay ref = {userVideoRef} style = {{border:'2px solid red'}}></video>}
        {callAccepted &&  <video autoPlay ref = {partnerVideofRef} style = {{border:'2px solid red'}}></video>}

        {receivedCall && <Grid>
            <Typography>Вам звонит {callerMan}</Typography>
            <Button color = 'primary' variant = 'contained' onClick = {acceptCall}>Ответить</Button>
        </Grid>
        }

        <Grid container justify = 'center' alignItems = 'center' style = {{width:'100%', height:'100%'}}>
            <Grid style = {{width:'60%', height:'60%'}}>
                <Paper style = {{width:'100%', height:'100%'}} elevation = {20}>
                    <Grid container direction = 'row' style = {{width:'100%', height:'100%'}}>
                        <Grid container direction = 'column' style ={{ width:'20%', height:'90%'}}>
                            <Typography varian = 'h6' style ={{margin:'10px'}}> Комната: {roomName}</Typography>
                            <Typography varian = 'h6' style ={{margin:'10px'}}> Пользователи:</Typography>
                            {allUsers}
                        </Grid>

                        <Grid container style ={{ width:'80%', height:'90%', overflow:'auto'}}>
                            <Grid container alignItems = 'center' direction = 'row' style = {{width:'100%', height:'10%', position:'relative'}}>
                                <CardMedia style = {{height:'100%', width:'15%', marginRight:'10px'}} image = 'https://hh.ru/employer-logo/2398142.png' />
                                <Typography variant = 'h6'>Chat</Typography>
                                <NavLink to = '/' style ={{position:'absolute', right:0, textDecoration:'none', color:'inherit'}}>
                                    <Button variant = 'contained' color = 'primary' onClick = {()=>{handleLeave(roomName)}}>Покинуть чат</Button>
                                </NavLink>
                            </Grid>
                            {messages}
                        </Grid>
                        
                        <Grid container alignItems = 'center' style = {{ width:'100%', height:'10%'}}>
                            <TextField label = 'Ваше сообщение...' style = {{width:'90%'}} variant = 'outlined' onChange = {changeHandle} autoFocus></TextField>
                            <Button onClick = {handleUserMessage} variant = 'contained' color = 'primary' style = {{width:'10%', height:'100%'}}>Отправить</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    </>
}

export default CharRoomContainer