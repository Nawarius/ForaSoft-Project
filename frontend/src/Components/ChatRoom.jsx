import { Button, Grid, TextField, Typography, Paper, CardMedia, Card } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import React from 'react'
import { NavLink } from 'react-router-dom';

const CharRoomContainer = ({roomName, handleUserMessage, users, changeHandle, callAccepted, receivedCall, caller, acceptCall, handleLeave,
    handleOpenInvite , allMessages, socketRef, userVideoRef, partnerVideofRef, stream, callUser, callGoing}) => {

    
    const allUsers = users.map(item => {
        return <Grid container>
                    <PersonIcon />
                    <Typography >{item.name}</Typography>
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
        return <Grid container direction = 'column' alignItems = 'left' style ={{width:'100%', height:'30%'}}>
                <Typography>{item.date}</Typography>
                <Typography>{item.sender}:</Typography>
                <Typography>{item.message}</Typography>
            </Grid>
    })
    
    return <> 
        {callGoing && <video playsInline muted autoPlay ref = {userVideoRef} style = {{border:'2px solid red'}}></video>}
        {callAccepted &&  <video playsInline autoPlay ref = {partnerVideofRef} style = {{border:'2px solid red'}}></video>}

        {receivedCall && <Grid>
            <Typography>Вам звонит {callerMan}</Typography>
            <Button color = 'primary' variant = 'contained' onClick = {acceptCall}>Ответить</Button>
        </Grid>
        }

        <Grid container justify = 'center' alignItems = 'center' style = {{width:'100%', height:'100%'}}>
            <Grid container xs = {12} sm = {10} md = {8} lg = {6} style = {{width:'60%', height:'60%'}}>
                <Paper style = {{width:'100%', height:'100%'}} elevation = {20}>
                    <Grid container direction = 'column' style = {{width:'100%', height:'100%'}}>

                        <Grid container alignItems = 'center' style ={{ position:'relative', height:'10%'}}>
                            <CardMedia style = {{height:'100%', width:'15%', marginRight:'10px'}} image = 'https://hh.ru/employer-logo/2398142.png' />
                            <Typography variant = 'h6'>Chat</Typography>
                            
                            <NavLink to = '/' style ={{position:'absolute', right:0, textDecoration:'none', color:'inherit' }}>
                                <Button variant = 'contained' color = 'primary' onClick = {()=>{handleLeave(roomName)}} >Покинуть чат</Button> 
                            </NavLink>
                        </Grid>

                        <Grid container style = {{width:'100%', height:'80%'}}>
                            <Grid container direction = 'column' style = {{width:'20%', height:'100%'}}>
                                <Typography varian = 'h6'> Комната: {roomName}</Typography>
                                <Typography varian = 'h6'> Пользователи:</Typography>
                                {allUsers}
                            </Grid>
                            <Grid container style = {{width:'80%', height:'100%', overflow:'auto'}} >
                                {messages} 
                             </Grid> 
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