import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Grid, Select, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { NavLink } from 'react-router-dom';

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
    width:'20%',
    height:'20%'
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

export default function TransitionsModal({acceptInvite, handleAcceptInviteClose,handleAcceptInvite, acceptedRoom, inviter}) {
  const classes = useStyles();
  
  return (
    <div>
      <Modal
        className={classes.modal}
        open={acceptInvite}
        onClose={handleAcceptInviteClose}
      >
        <Fade in={acceptInvite}>
          <Grid container direction = 'column' justify = 'center' className={classes.paper}>
                <Typography style = {{textAlign : 'center'}}>{inviter} приглашает вас в чат:</Typography>
                <Typography variant = 'h6' style = {{textAlign : 'center', margin:'10px'}}>{acceptedRoom}</Typography>
                <NavLink to = '/'><Button variant = 'contained' color = 'primary' onClick = {()=>{handleAcceptInvite(acceptedRoom)}}>Принять</Button></NavLink>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
