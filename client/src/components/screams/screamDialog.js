import React,{useState,Fragment} from 'react';
import Button from '../button/button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import { Typography,CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getScream,likeScream,unlikeScream} from '../../redux/actions/dataActions'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import avatar from '../../images/avatar.png'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Comments from '../comments/comments';


const ScreamDialog=(props)=>{
    const{scream_id,user_id,created_at,body,likeCount,image,username,comments}=props.scream
    const {loading}=props.UI
    const [open,setOpen]=useState(false)
    const [like,setLike]=useState(false)
    const handleOpen=()=>{
         setOpen(true)  
         props.getScream(props.screamId)
    }
    const handleClose=()=>{  
      setOpen(false)
  }

const likeScream=()=>{
  setLike(true)
  props.likeScream(scream_id)
}
const unlikeScream=()=>{
  setLike(false)
  props.unlikeScream(scream_id)
  props.getScream(scream_id)

}
 
const likeButton=!like?(
                     <IconButton onClick={likeScream}  style={{ width: "35px", height:"35px"}} >
                        <FavoriteBorderIcon style={{color:"E76F51"}}/>
                     </IconButton>
               ):(
                <IconButton onClick={unlikeScream} style={{ width: "35px", height:"35px"}}>
                    <FavoriteIcon style={{color:"E76F51"}}/>
                </IconButton>
                 )


  const dialogMarkup=loading?(
    <CircularProgress size={200}/>
  ):(
    <Grid container>
       <Grid item sm={5}>
          <img src={ image ? `data:image/png;base64,${ Buffer.from(image).toString('base64')}` : avatar} alt='Profile' />
       </Grid>
       <Grid item sm={7}>
          <Typography
              component={Link}
              colors="primary"
              variant="h5"
              to={`/users/${username}`}>
              {username}
          </Typography>
         
          <Typography variant="body2" color="textSecondary">
              {dayjs(created_at).format('h:mm a, MMM DD YYYY')}
          </Typography>
          <hr/>
          <Typography variant="body1">
              {body}
          </Typography>
          <hr/>
          <div >
          {likeButton}
          <span style={{marginRight:"40px"}}>{likeCount}likes</span>
         
         
          <IconButton   aria-label="add an alarm" style={{ width: "35px", height:"35px"}}>
               <CommentIcon style={{color:"E76F51"}}/>
            </IconButton>
            <span>{comments?.length} comments</span>
          </div>  
          <hr/>
 
       </Grid>
       <div style={{marginTop:"20px",paddingLeft:"20px"}}>
                 <Comments comments={comments}/>
       </div>
    </Grid>
  )
  
  return (
    <Fragment>
       <IconButton onClick={handleOpen} style={{ width: "35px", height:"35px",left:"63%"}}>
           <UnfoldMoreIcon />
       </IconButton>
       <Dialog 
           open={open}
           onClose={handleClose}
           fullWidth
           maxWidth="sm">
        
        <IconButton onClick={handleClose}  style={{ width: "35px", height:"35px",left:"90%"}} >
            <CloseIcon/>
        </IconButton>
        <DialogContent>
           {dialogMarkup}
        </DialogContent>
       </Dialog>
    </Fragment>
  );
}

const mapStateToProps=(state)=>({
    UI:state.UI,
    scream:state.data.scream
  })

  const mapDispatchToProps=(dispatch)=>{
    return {
   getScream:(screamId)=>{
    dispatch(getScream(screamId))
  },
  likeScream:(screamId)=>{
    dispatch(likeScream(screamId))
  },
  unlikeScream:(screamId)=>{
    dispatch(unlikeScream(screamId))
  }
  
  }
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(ScreamDialog);
