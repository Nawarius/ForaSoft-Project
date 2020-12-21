import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Grid, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'10%'
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    margin:'20px'
  },
}));

export default function TransitionsModal({handleCloseInvite, openInvite, myRooms, roomName, targetId, inviteHandle, socketRef}) {
    const classes = useStyles();
    const [room, setRoom] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const handleChange = (event) => {
      setRoom(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    const rooms = myRooms.map(item=>{
        if(roomName == item) return
        return <MenuItem value={item}>{item}</MenuItem>
        
    })
  return (
    <div>
      <Modal
        className={classes.modal}
        open={openInvite}
        onClose={handleCloseInvite}
      >
        <Fade in={openInvite}>
          <Grid container justify = 'center' className={classes.paper}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Выберите чат:</InputLabel>
                    <Select open={open} onClose={handleClose} onOpen={handleOpen} value={room} onChange={handleChange}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {rooms}
                    </Select>
                </FormControl>
                <Button variant = 'contained' color = 'primary' onClick = {()=>{inviteHandle(socketRef.current.id, targetId, room)}}>Пригласить</Button>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
