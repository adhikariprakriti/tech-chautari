import React,{Fragment,useEffect} from 'react';
import classes from './comments.module.css';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import avatar from '../../images/avatar.png'
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getScream} from '../../redux/actions/dataActions'


const useStyles=makeStyles({
    commentImage:{
        height: "100px",
        width:"100px",
        objectFit: "contain",
        borderRadius: "50%" 
    }
})


const Comments=(props)=>{
    const {comments}=props
    const style=useStyles();
    
  return (
      <Grid container>
        {comments.map((comment)=>{
            const {body,created_at,image,username}=comment;
            return(
                <Fragment key={created_at}>
                 <Grid item sm={12}>
                   <Grid container>
                      <Grid item sm={3}>
                         <img src={image ? `data:image/png;base64,${ Buffer.from(image).toString('base64')}` : avatar} alt="commenter" style={{ height: "80px", width:"80px",objectFit: "cover", borderRadius: "50%" }}/>
                      </Grid>
                      <Grid item sm={9}>
                        <div style={{marginLeft:"20px",marginBottom:"20px"}}>
                           <Typography
                               variant="h5"
                               component={Link}
                               to={''}
                               >
                               {username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                               {dayjs(created_at).format('h:mm a, MMM DD YYYY')}
                            </Typography>
                            <Typography variant="body1">{body}</Typography>
                        </div>
                      </Grid>
                   </Grid>
                 </Grid>
                 <hr/>

                </Fragment>
            )
        })}
      </Grid>
  );
}

const mapDispatchToProps=(dispatch)=>{
  return {
 getScream:(screamId)=>{
  dispatch(getScream(screamId))
}
  }}


export default connect(null,mapDispatchToProps)(Comments);
