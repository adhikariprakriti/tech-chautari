import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
 import avatar from '../../images/avatar.png'
 import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime' 

 const useStyles=makeStyles({
    card: {
        display:"flex",
        width:"70%",
        margin:"20px auto",


    },
    headline:{
        color:"#003D5B",
        fontWeight:"700",
         },

  image:{
      minWidth:"120px",
  }

})



const Scream=(props)=>{
    const classes=useStyles();
     dayjs.extend(relativeTime);
  return (
      <Card className={classes.card}>
          <CardMedia image={avatar} className={classes.image} title="profile image"/>
          <CardContent>
            <Typography variant="h5" className={classes.headline} component={Link} to={`/users/${props.scream.username}`} >{props.scream.username}</Typography>
            <Typography variant="body2" color="textSecondary">{dayjs(props.scream.created_at).fromNow()}</Typography>
            <Typography variant="body1">{props.scream.body}</Typography>
          </CardContent> 
       </Card> 
  );
}

export default Scream;
