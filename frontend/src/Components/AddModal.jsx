import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Context} from './JoinRoomContainer'
import { useContext } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';

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
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const {openModal,handleCloseModal,changeHandle, changeRoomInput, handleCreateRoom} = useContext(Context)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Grid container direction = 'column'>
              <TextField autoFocus label = 'Введите название чата' value = {changeRoomInput} onChange = {changeHandle}></TextField>
              <Grid>
                <Button onClick = {handleCreateRoom}>Создать</Button>
                <Button onClick = {handleCloseModal}>Отменить</Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
