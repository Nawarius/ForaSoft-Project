import React from 'react'
import JoinRoomContainer from './Components/JoinRoomContainer'
import ChatRoomContainer from './Components/ChatRoomContainer'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';

export const JoinRoomContext = React.createContext()
export const ChatRoomContext = React.createContext()

function App() {
  const [name, setName] = useState(null)
  const [roomName, setRoomName] = useState(null)

  const [rooms, setMoreRooms] = useState([])
  const [users, setUsers] = useState([])

  const handleName = (e)=>{setName(e.target.value)}
  const roomNameHandle = (value)=>{setRoomName(value)}

  const [myRooms, setMyRooms] = useState([])
  const [redirect, setRedirect] = useState()

  const socketRef = useRef()
  //if(redirect) setRoomName(redirect)

  const myRoomsHandle = (rName)=> {setMyRooms(oldAr => [...oldAr, rName])}


  useEffect(()=>{
    socketRef.current = io.connect('http://localhost:4000')

    socketRef.current.on('new user', users => {
        setUsers(users)
    })

    socketRef.current.on('new room', rooms => {
      setMoreRooms(rooms)
    })

  },[])
  return <>
    <BrowserRouter>
      {redirect && <Redirect to = {'/' + roomName} />}
        <Switch>
          <Route exact path = '/'> 
              <JoinRoomContext.Provider value = {{handleName,roomNameHandle,setMoreRooms,roomName,name,rooms,socketRef}}>
                  <JoinRoomContainer />
              </JoinRoomContext.Provider>
          </Route>
          <Route path = {'/' + roomName}> 
              <ChatRoomContext.Provider value = {{name, roomName, socketRef }}>
                  <ChatRoomContainer name = {name} roomName = {roomName} myRoomsHandle = {myRoomsHandle} myRooms = {myRooms}
                    socketRef = {socketRef} setRoomName = {setRoomName} setRedirect = {setRedirect}/>
                  </ChatRoomContext.Provider>
            </Route>
        </Switch>
    </BrowserRouter>
    </>
}

export default App;
