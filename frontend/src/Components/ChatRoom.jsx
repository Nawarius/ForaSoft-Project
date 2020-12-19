import { Button, Grid, TextField, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import React from 'react'
import { NavLink } from 'react-router-dom';

const CharRoomContainer = ({roomName, handleUserMessage, users, changeHandle, callAccepted, receivedCall, caller, acceptCall,
     allMessages, socketRef, userVideoRef, partnerVideofRef, stream, callUser}) => {

    
    const allUsers = users.map(item => {
        return <Grid container direction = 'row' alignItems = 'center' >
                    <PersonIcon />
                    <Typography style ={{margin:'10px'}}>{item.name}</Typography>
                    {socketRef.current.id !== item.id && <button onClick = {()=>{callUser(item.id)}}>Позвонить</button>}
                </Grid>
    })
    const callerMan = users.map(user=>{
        if(user.id==caller) return user.name
    })
    const messages = allMessages.map(item => {
        return <Grid container direction = 'column' alignItems = 'left' style ={{border:'1px solid blue', width:'100%', height:'15%'}}>
                <Typography>{item.date}</Typography>
                <Typography>{item.sender}</Typography>
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
            <Grid container direction = 'row' style = {{width:'60%', height:'60%', border:'1px solid red'}}>
                <Grid container direction = 'column' style ={{ width:'20%', height:'90%'}}>
                    <Typography varian = 'h6' style ={{margin:'10px'}}> Комната: {roomName}</Typography>
                    <Typography varian = 'h6' style ={{margin:'10px'}}> Пользователи:</Typography>
                    {allUsers}
                </Grid>
                <Grid container style ={{ width:'80%', height:'90%', overflow:'auto'}}>
                    <Grid container alignItems = 'center' direction = 'row' style = {{width:'100%', height:'10%', position:'relative'}}>
                        <Typography variant = 'h6' >ForaSoftChat</Typography>
                        <NavLink to = '/' style ={{textDecoration:'none', color:'inherit', height:'60%', width:'5%'}}>
                            <Button size = 'small' variant = 'contained' color = 'primary' style = {{position:'absolute', right:0}}>Покинуть чат</Button>
                        </NavLink>
                    </Grid>
                    {messages}
                </Grid>
                <Grid container alignItems = 'center' style = {{ width:'100%', height:'10%'}}>
                    <TextField label = 'Ваше сообщение...' style = {{width:'90%'}} variant = 'outlined' onChange = {changeHandle} autoFocus></TextField>
                    <Button onClick = {handleUserMessage} variant = 'contained' color = 'primary' style = {{width:'10%'}}>Отправить</Button>
                </Grid>
                
            </Grid>
            
        </Grid>
    </>
}

export default CharRoomContainer