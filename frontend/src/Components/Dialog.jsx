import React from 'react';
import AddModal from './AddModal'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { useContext } from 'react';
import { Context } from './JoinRoomContainer'


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog() {
  const {handleCloseDialog, handleOpenModal, openDialog, rooms} = useContext(Context)

  const classes = useStyles();

  return (
    <Dialog onClose={()=>{handleCloseDialog(null)}} open={openDialog}>
      <DialogTitle >Выберите комнату</DialogTitle>
      <List>
        {rooms.map((room,index) => (
          <ListItem button onClick={() => handleCloseDialog(room.roomName)} key={index}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PeopleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={room.roomName} />
          </ListItem>
        ))}
        <ListItem button onClick={handleOpenModal}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Добавить комнату" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const {handleOpenDialog, roomName} = useContext(Context)
  return <>
      <Button variant="outlined" color="primary" onClick={handleOpenDialog}>Выбрать чат комнату</Button>
      <Typography variant="subtitle1" style = {{textAlign:'center'}}>{roomName}</Typography>
      <SimpleDialog />
      <AddModal />
    </>
  
}
