import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import JoinRoomPresent from './JoinRoom'

export const Context = React.createContext()

const JoinRoom = () => {
    const [name,setName] = useState(null)

    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState(false)
    const [rooms, setMoreRooms] = useState(['Собеседование', 'JavaScript'])
    const [changeRoomInput, setChangeRoomInput] = useState(null)

    const handleOpenDialog = () => {setOpenDialog(true)}
    const handleCloseDialog = (value) => {
        if(value) setDialogValue(value) 
        setOpenDialog(false)
    }
    const handleOpenModal = () => {setOpenModal(true)}
    const handleCloseModal = () => {setOpenModal(false)}

    const changeHandle = (e) => {
        setChangeRoomInput(e.target.value)
    }
    const handleCreateRoom = () => {
        setMoreRooms([...rooms, changeRoomInput])
        setOpenModal(false)
        setChangeRoomInput(null)
    }

    return <>
        <Context.Provider value = {{openModal, handleOpenDialog, handleCloseDialog, handleOpenModal, handleCloseModal,
             dialogValue, openDialog, rooms, changeRoomInput, changeHandle, handleCreateRoom}} >
            <JoinRoomPresent />
        </Context.Provider>
    </>
    
}

export default JoinRoom