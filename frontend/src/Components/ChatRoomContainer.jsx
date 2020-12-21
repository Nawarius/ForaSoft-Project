import React, { useEffect } from 'react'
import ChatRoom from './ChatRoom'
import EasterEgg from './EasterEgg'
import Peer from "simple-peer"
import { useRef, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import InviteModal from './InviteModal'
import AcceptInviteModal from './AcceptInviteModal'

const CharRoomContainer = ({name, roomName, socketRef, setRoomName, myRoomsHandle, myRooms, setRedirect}) => {
    const [usersInRoom, setUsersInRoom] = useState([])
    const [userMessage, setUserMessage] = useState()
    const [allMessages, setAllMessages] = useState([])
    const [stream, setStream] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [receivedCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState()
    const [callerSignal, setCallerSignal] = useState()
    const [callGoing, setCallGoing] = useState()

    const [openInvite, setOpenInvite] = useState(false)
    const [inviter, setInviter] = useState()
    const [targetId, setTargetToInvite] = useState()
    const [acceptInvite, setAcceptInviteModal] = useState(false)
    const [acceptedRoom, setAcceptedRoom] = useState()
    

    const location = useLocation()
    const userVideoRef = useRef()
    const partnerVideofRef = useRef()

    let hasVideo = false
    let hasAudio = false

  async function getConnectedDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(device => {
        if (device.kind === 'audioinput') hasAudio = true
        if (device.kind === 'videoinput') hasVideo = true
    })
  }

  async function shareDevices(){
    getConnectedDevices().then(()=>{
      navigator.mediaDevices.getUserMedia({ audio:hasAudio, video:hasVideo }).then(stream => {
        setStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      })
    })
  }

    useEffect(()=>{

        const roomExist = myRooms.find(item=>item == roomName)
        if(!roomExist) myRoomsHandle(roomName)

        setRedirect(false)
        shareDevices()

        socketRef.current.emit('join server', name)
    
        socketRef.current.emit('join room', roomName)

        socketRef.current.on('accept invite', (rName, user) => {
            setAcceptInviteModal(true)
            setInviter(user)
            setAcceptedRoom(rName)
        })

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

        
        
    },[])
/////////////////////////////////////////////////////////////////////////
    const callUser = async (id) => {
        setCallGoing(true)
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
    const acceptCall = () => {
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

    const handleLeave = (rName) => {
        socketRef.current.emit('leave', rName)
    }
    const inviteHandle = (inviterId, targetId, roomName) => {
        setOpenInvite(false)
        socketRef.current.emit('invite room', inviterId, targetId, roomName)
    }
    const handleOpenInvite = (targetId)=>{
        setTargetToInvite(targetId)
        setOpenInvite(true)
    }
    const handleCloseInvite = ()=>{
        setOpenInvite(false)
    }
    const handleAcceptInviteClose = (rName)=>{
        setAcceptInviteModal(false)
     }
     const handleAcceptInvite = (rName)=>{
        setRoomName(rName)
        setRedirect(true)
        setAcceptInviteModal(false)
     }
    return <>
        {roomName && <ChatRoom roomName = {roomName} handleUserMessage = {handleUserMessage} socketRef = {socketRef} handleLeave = {handleLeave}
            handleOpenInvite = {handleOpenInvite} callGoing = {callGoing}
         userVideoRef = {userVideoRef} partnerVideofRef = {partnerVideofRef} stream = {stream} callUser = {callUser} inviteHandle = {inviteHandle}
         callAccepted = {callAccepted} receivedCall = {receivedCall} caller = {caller} acceptCall = {acceptCall}
         users = {usersInRoom} changeHandle = {changeHandle} allMessages = {allMessages} />}
        {!roomName && <EasterEgg />}
        <InviteModal  handleCloseInvite = {handleCloseInvite} openInvite = {openInvite} socketRef = {socketRef}
        inviteHandle = {inviteHandle} myRooms = {myRooms} roomName = {roomName} targetId = {targetId}/>
        <AcceptInviteModal acceptInvite = {acceptInvite}
        handleAcceptInviteClose = {handleAcceptInviteClose} inviter = {inviter} acceptedRoom = {acceptedRoom} handleAcceptInvite = {handleAcceptInvite}/>
    </>
}

export default CharRoomContainer