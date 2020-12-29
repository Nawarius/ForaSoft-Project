import { Button, Grid, TextField, Typography, Paper, CardMedia, Card, Hidden, IconButton } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import React from 'react'
import { NavLink } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const CharRoomContainer = ({roomName, handleUserMessage, users, changeHandle, callAccepted, receivedCall, caller, acceptCall, handleLeave,
    handleOpenInvite , allMessages, socketRef, userVideoRef, partnerVideofRef, stream, callUser, callGoing}) => {

    const allUsers = users.map(item => {
        return <Grid container>
                    <PersonIcon />
                    <Typography noWrap>{item.name}</Typography>
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
        return <Grid container direction = 'column' alignItems = 'left' >
                <Typography>{item.date}</Typography>
                <Typography>{item.sender.name}:</Typography>
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

        <Grid container xs = {12} sm = {12} justify = 'center' alignItems = 'center' style = {{width:'100%', height:'100%'}}>
            <Grid container xs = {12} sm = {10} md = {8} lg = {6} style = {{height:'60%'}}>
                <Paper style = {{width:'100%', height:'100%'}} elevation = {20}>
                    <Grid container direction = 'column' style = {{ height:'100%'}}>

                        <Grid container alignItems = 'center' style ={{ position:'relative', width:'100%',height:'10%'}}>
                            <Grid item xs = {4} sm = {2} md = {2} lg = {2} style = {{height:'100%', width:'40%'}}>
                                <CardMedia style = {{height:'100%'}} image = 'https://hh.ru/employer-logo/2398142.png' />
                            </Grid>
                            <Hidden only = 'xs'>
                                <Grid item xs = {3}><Typography variant = 'h6'>Chat</Typography></Grid>
                            </Hidden>
                            <Grid item xs = {8} style ={{position:'absolute', right:0, height:'100%' }} >
                                <NavLink to = '/' style ={{textDecoration:'none', color:'inherit',height:'100%'  }} >
                                    <IconButton style = {{ height:'100%'}}>
                                        <ExitToAppIcon onClick = {()=>{handleLeave(roomName)}}/>
                                    </IconButton>
                                </NavLink>
                            </Grid>
                        </Grid>

                        <Grid container style = {{width:'100%', height:'80%'}}>
                                <Grid container xs = {4} sm = {3} md = {3} wrap = 'nowrap' direction = 'column' style = {{ height:'100%'}}>
                                        <Typography noWrap varian = 'h6'> Чат: {roomName}</Typography>
                                        <Typography varian = 'h6'> Люди:</Typography>
                                        {allUsers}
                                </Grid>
                            
                                <Grid xs = {8} sm = {9} md = {9} container style = {{ height:'100%', overflow:'auto'}} >
                                    {messages} 
                                </Grid> 
                             
                         </Grid>                                     
                        
                        <Grid container alignItems = 'center' style = {{ position:'relative',width:'100%', height:'10%'}}>
                            <Grid item xs = {9} sm = {10} md = {11} lg = {11} style = {{position:'relative', height:'100%' }}>
                                <TextField placeholder = 'Ваше сообщение...' onChange = {changeHandle} autoFocus
                                 style = {{position:'absolute', bottom:0, width:'100%'}}/>
                            </Grid>

                            <Grid item xs = {3} sm = {2} md = {1} lg = {1} style = {{position:'absolute', right:0}}>
                                <IconButton onClick = {handleUserMessage} variant = 'contained' color = 'primary' ><SendIcon /></IconButton>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    </>
}

export default CharRoomContainer