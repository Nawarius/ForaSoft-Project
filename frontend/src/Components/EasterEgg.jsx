import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width:'100%',
    height:'100%',
  },
  media: {
    width:'70%',
    height:'50%',
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Grid container alignItems = 'center' justify = 'center' className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://pashalki.ru/wp-content/uploads/2018/06/pashalki-chto-takoe.jpg"
          title="Easter Egg"
        />
    </Grid>
  );
}
