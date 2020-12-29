import React, { useContext } from 'react'
import { useState } from 'react'
import JoinRoomPresent from './JoinRoom'
import {JoinRoomContext} from '../App'

export const Context = React.createContext()


const JoinRoom = () => {
    const {handleName,roomNameHandle,name,roomName,rooms,socketRef} = useContext(JoinRoomContext)
    //Обработчики модального окна и окна выбора чата
    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    
    const [newRoom, setNewRoomChange] = useState(null)

    const handleNewRoom = (e)=>{
        setNewRoomChange(e.target.value)
    }

    const handleOpenDialog = () => {setOpenDialog(true)}
    const handleCloseDialog = (value) => {
        if(value) {
            roomNameHandle(value)
        }
        setOpenDialog(false)  
    }
    const handleOpenModal = () => {setOpenModal(true)}
    const handleCloseModal = () => {setOpenModal(false)}

    const handleCreateRoom = () => {
        socketRef.current.emit('new room', newRoom)
        roomNameHandle(newRoom)
        setOpenModal(false)
        setNewRoomChange(null)
    }

    return <>
        <Context.Provider value = {{openModal, openDialog, handleOpenDialog, handleCloseDialog, handleOpenModal, handleCloseModal, handleNewRoom,
              rooms, handleCreateRoom, handleName, name, roomName, newRoom, socketRef}} >
            <JoinRoomPresent />
        </Context.Provider>
    </>
    
}

export default JoinRoom