import React, { useEffect } from 'react'
import ChatRoom from './ChatRoom'
import EasterEgg from './EasterEgg'

import { useRef, useState } from 'react';

const CharRoomContainer = ({name, roomName, socketRef}) => {

    
    const [usersInRoom, setUsersInRoom] = useState([])

    const [userMessage, setUserMessage] = useState()
    const [allMessages, setAllMessages] = useState([])

    useEffect(()=>{
        socketRef.current.emit('join server', name)

        socketRef.current.emit('join room', roomName)

        socketRef.current.on('message', payload => {
            setAllMessages(payload)
        })

        socketRef.current.on('joined', users => {
            setUsersInRoom(users)
        })
        return (()=>{
            socketRef.current.emit('leave', roomName)
        })
        
    },[])

    const changeHandle = (e) => {
        setUserMessage(e.target.value)
    }
    const handleUserMessage = () =>{
        socketRef.current.emit('message', userMessage, roomName)
    }

    return <>
        {roomName && <ChatRoom roomName = {roomName} handleUserMessage = {handleUserMessage} users = {usersInRoom} changeHandle = {changeHandle} allMessages = {allMessages}/>}
        {!roomName && <EasterEgg />}
    </>
}

export default CharRoomContainer