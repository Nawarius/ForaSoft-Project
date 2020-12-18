import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import JoinRoomPresent from './JoinRoom'


export const Context = React.createContext()

const JoinRoom = ({setName, setRoomName, roomName, name, setMoreRooms, rooms}) => {
    //Обработчики модального окна и окна выбора чата
    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    
    const [changeRoomInput, setChangeRoomInput] = useState(null)

    const handleOpenDialog = () => {setOpenDialog(true)}
    const handleCloseDialog = (value) => {
        if(value) {
            setRoomName(value)
        }
        setOpenDialog(false)
    }
    const handleOpenModal = () => {setOpenModal(true)}
    const handleCloseModal = () => {setOpenModal(false)}

    const handleName = (value)=>{setName(value)}

    const changeHandle = (e) => {
        switch(e.target.name){
            case 'roomInput':{
                setChangeRoomInput(e.target.value)
                break
            }
            case 'name':{
                setName(e.target.value)
                break
            }
            default:
                break
        }
    }
    const handleCreateRoom = () => {
        setRoomName(changeRoomInput)
        setMoreRooms([...rooms, changeRoomInput])
        setOpenModal(false)
        setChangeRoomInput(null)
    }

    return <>
        <Context.Provider value = {{openModal, handleOpenDialog, handleCloseDialog, handleOpenModal, handleCloseModal,
             openDialog, rooms, changeRoomInput, changeHandle, handleCreateRoom, handleName, roomName}} >
            <JoinRoomPresent changeHandle = {changeHandle} roomName = {roomName} name = {name}/>
        </Context.Provider>
    </>
    
}

export default JoinRoom