import JoinRoomContainer from './Components/JoinRoomContainer'
import ChatRoomContainer from './Components/ChatRoomContainer'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';

function App() {
  const [name, setName] = useState(null)
  const [roomName, setRoomName] = useState(null)
  const [rooms, setMoreRooms] = useState(['Собеседование', 'JavaScript'])
  const [users, setUsers] = useState([])
  const [myRooms, setMyRooms] = useState([])
  const [redirect, setRedirect] = useState()

  //if(redirect) setRoomName(redirect)

  const myRoomsHandle = (rName)=> {
    setMyRooms(oldAr => [...oldAr, rName])
  }

  const socketRef = useRef()

  useEffect(()=>{
    socketRef.current = io.connect('http://localhost:4000')
    console.log('here')
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
      <Route exact path = '/'> <JoinRoomContainer setName = {setName} setRoomName = {setRoomName} 
      roomName = {roomName} name = {name} rooms = {rooms} setMoreRooms = {setMoreRooms} />
      </Route>
      <Route path = {'/' + roomName}> <ChatRoomContainer name = {name} roomName = {roomName} myRoomsHandle = {myRoomsHandle} myRooms = {myRooms}
      socketRef = {socketRef} setRoomName = {setRoomName} setRedirect = {setRedirect}/> </Route>
    </Switch>
  </BrowserRouter>
  </>
}

export default App;
