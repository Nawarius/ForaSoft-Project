import React, { useEffect } from 'react'
import ChatRoom from './ChatRoom'
import EasterEgg from './EasterEgg'
import Peer from "simple-peer";
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'

const CharRoomContainer = ({name, roomName, socketRef, setRoomName}) => {
    const [usersInRoom, setUsersInRoom] = useState([])
    const [userMessage, setUserMessage] = useState()
    const [allMessages, setAllMessages] = useState([])
    const [stream, setStream] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [receivedCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState()
    const [callerSignal, setCallerSignal] = useState()
    const location = useLocation()
    const userVideoRef = useRef()
    const partnerVideofRef = useRef()

    useEffect(()=>{
        // if(!roomName){
        //     socketRef.current = io.connect('http://localhost:4000')
        //     setRoomName(location.pathname.split('/')[2])
        // }

        socketRef.current.emit('join server', name)
    
        socketRef.current.emit('join room', roomName)

        socketRef.current.on('message', (payload, roomN) => {
            if(roomN == roomName){
                setAllMessages(payload)
            }
        })

        socketRef.current.on('joined', users => {
            setUsersInRoom(users)
        })

        socketRef.current.on("hey", (data) => {
            console.log('here')
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })

        // return (()=>{
        //     socketRef.current.emit('leave', roomName)
        // })
        
    },[])
/////////////////////////////////////////////////////////////////////////
    const callUser = (id) => {
        navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
            setStream(stream)
            if(userVideoRef.current){
                userVideoRef.current.srcObject = stream
            }
        })
        const peer = new Peer({
            initiator:true,
            trickle:false,
            config: {
                iceServers: [
                  {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
                ]
            },
            stream:stream
        })

        peer.on("signal", data => {
            //Offer
            console.log('signal')
            socketRef.current.emit("callUser", { userToCall: id, signalData: data, from: socketRef.current.id })
        })
    
        peer.on("stream", stream => {
            if (partnerVideofRef.current) {
                partnerVideofRef.current.srcObject = stream;
            }
        })

        socketRef.current.on("callAccepted", signal => {
            setCallAccepted(true)
            peer.signal(signal)
        })
    }
/////////////////////////////////////////////////////////////////////////////
function acceptCall() {
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        setStream(stream)
        if(userVideoRef.current){
            userVideoRef.current.srcObject = stream
        }
        
    })

    setCallAccepted(true)

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    })

    peer.on("signal", data => {
      //Answer
      socketRef.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideofRef.current.srcObject = stream;
    })
    
    peer.signal(callerSignal);
  }
  ///////////////////////////////////////////////////////////////////////////
    const changeHandle = (e) => {
        setUserMessage(e.target.value)
    }
    const handleUserMessage = () =>{
        socketRef.current.emit('message', userMessage, roomName)
    }

    return <>
        {roomName && <ChatRoom roomName = {roomName} handleUserMessage = {handleUserMessage} socketRef = {socketRef}
         userVideoRef = {userVideoRef} partnerVideofRef = {partnerVideofRef} stream = {stream} callUser = {callUser}
         callAccepted = {callAccepted} receivedCall = {receivedCall} caller = {caller} acceptCall = {acceptCall}
         users = {usersInRoom} changeHandle = {changeHandle} allMessages = {allMessages} />}
        {!roomName && <EasterEgg />}
    </>
}

export default CharRoomContainer