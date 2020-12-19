import JoinRoomContainer from './Components/JoinRoomContainer'
import ChatRoomContainer from './Components/ChatRoomContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';

function App() {
  const [name, setName] = useState(null)
  const [roomName, setRoomName] = useState(null)
  const [rooms, setMoreRooms] = useState(['Собеседование', 'JavaScript'])
  const [users, setUsers] = useState([])

  const socketRef = useRef()

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
    <Switch>
      <Route exact path = '/'> <JoinRoomContainer setName = {setName} setRoomName = {setRoomName} 
      roomName = {roomName} name = {name} rooms = {rooms} setMoreRooms = {setMoreRooms} />
      </Route>
      <Route path = {'/room/' + roomName}> <ChatRoomContainer name = {name} roomName = {roomName} socketRef = {socketRef} setRoomName = {setRoomName}/> </Route>
    </Switch>
  </BrowserRouter>
  </>
}

export default App;
