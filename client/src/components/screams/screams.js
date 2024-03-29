import React ,{useEffect}from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Container, Typography } from '@material-ui/core';
 import avatar from '../../images/avatar.png'
 import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime' 
import {connect} from 'react-redux';
import {likeScream,unlikeScream,getScream} from '../../redux/actions/dataActions';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteScreams from './deleteScreams';
import ScreamDialog from './screamDialog';

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
      objectFit:"contain"
  }

})



const Scream=(props)=>{
  //const deleteButton=props.user.authenticted && props.user.userdata.id===props.data.screams.user_id ?(<DeleteScream screamId={scream_id}/>):null

     const classes=useStyles();
     dayjs.extend(relativeTime);
 
     useEffect(()=>{
        props.getScream(props.scream.scream_id)
    
     },[])

     const likedScream=()=>{
           if(
             props.user.likes && 
             props.user.likes.find(
               like=>like.screamId===props.scream.scream_id
               ))
               return true;
               else return false
     };
     const likeScream=()=>{
       props.likeScream(props.scream.scream_id)
     }
     const unlikeScream=()=>{
      props.unlikeScream(props.scream.scream_id)
    }


  const likeButton=!props.user.authenticated?(
    <IconButton style={{ width: "35px", height:"35px"}}>
      <Link to='/login'>
      <FavoriteBorderIcon style={{color:"E76F51"}}/>
      </Link>
    </IconButton>
  ):(likedScream()?(
       <IconButton onClick={unlikeScream} style={{ width: "35px", height:"35px"}}>
         <FavoriteIcon style={{color:"E76F51"}}/>
       </IconButton>
  ):
  (
    <IconButton onClick={likeScream}  style={{ width: "35px", height:"35px"}} >
      <FavoriteBorderIcon style={{color:"E76F51"}}/>
    </IconButton>

  )
  )


const deleteButton=props.user.authenticated && props.scream.user_id===props.user.userdata.id ? (
        <DeleteScreams screamId={props.scream.scream_id}/>
):null


  return (
      <Card className={classes.card}>
          <CardMedia image={props.scream.image ? `data:image/png;base64,${ Buffer.from(props.scream.image).toString('base64')}` : avatar} className={classes.image} title="profile image"/>
          <CardContent>
            <Typography variant="h5" className={classes.headline} component={Link} to={`/users/${props.scream.username}`} >{props.scream.username}</Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">{dayjs(props.scream.created_at).fromNow()}</Typography>
            <Typography variant="body1">{props.scream.body}</Typography>
            {likeButton}
            <span style={{marginRight:"30px"}}>{props.data.scream.likeCount} likes</span>
            <IconButton   aria-label="add an alarm" style={{ width: "35px", height:"35px"}}>
               <CommentIcon style={{color:"E76F51"}}/>
            </IconButton>
            <span>{3} comments</span>
              <ScreamDialog screamId={props.scream.scream_id} userId={props.scream.user_id}/>
            </CardContent> 
       </Card> 
  );
}

const mapStateToProps=(state)=>({
  user: state.user,
  UI:state.UI,
  data:state.data
})

const mapDispatchToProps=(dispatch)=>{
  return {
    likeScream:(screamId)=>{
     dispatch(likeScream(screamId))
  },
  unlikeScream:(screamId)=>{
    dispatch(unlikeScream(screamId))
 },
 getScream:(screamId)=>{
  dispatch(getScream(screamId))
}

}
}

export default connect(mapStateToProps,mapDispatchToProps)(Scream);
