import React,{Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '../button/button';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import avatar from '../../images/avatar.png'
import CalendarToday from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';
import classes from './profile.module.css'
import Tooltip from '@material-ui/core/Tooltip';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {uploadImage} from '../../redux/actions/userActions';
import EditProfile from '../editProfile/editprofile'

const Profile=(props)=>{
const {image,username,email,created_at,website,bio,location}=props.user.userdata

const handleImageChange=e=>{
  const image=e.target.files[0];
  console.log(image);
  const formData=new FormData();
  formData.append('avatar',image)
  props.uploadImage(formData)
}

const handleEditImage=()=>{
  const fileInput=document.getElementById("imageInput");
  fileInput.click();
}

let profileMarkup=!props.user.loading?
               (props.user.authenticated?
                (
                  <div className={classes.container}>
         <div className={classes.profile_image}>
           <img src={image ? `data:image/png;base64,${image}` : avatar} alt="profile" />    
          <input  type="file" 
                  id="imageInput"
                  hidden="hidden" 
                  onChange={handleImageChange}/>
          <Tooltip title="Edit profile picture" placement="top">
            <IconButton onClick={handleEditImage} className="button">
              <EditIcon style={{ color: "#003D5B"}} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.username}>
          <Link to={`/users/${username}`} ><h2>{username}</h2></Link>
        </div>
        <div>
        {
          bio && <p>{bio}</p>
        }
        </div>
        <div>
          {
            email && 
            <Fragment>
              <EmailIcon style={{ color: "#003D5B"}} />{' '}<span>{email}</span>
            </Fragment>
            
          }
          
        </div>
        <div>
          {
            location &&
            <Fragment>
               <LocationOnIcon style={{ color: "#003D5B"}}/>{' '}<span>{location}</span>
            </Fragment>
          }
          
        </div>
        <div>
          {
            website &&
            <Fragment>
                 <LinkIcon style={{ color: "#003D5B"}}/>
                 <a href={website} target="_blank" rel="noopener noreferrer">
                   {''}{website}
                 </a>
            </Fragment>
          }
        </div>
        <div>
          {
            created_at &&
            <Fragment>
                  <CalendarToday style={{ color: "#003D5B"}}/>{' '}<span>Joined {dayjs(created_at).format('MMM YYYY')}</span>
            </Fragment>
          } 
        </div>

        <EditProfile/>
      </div>
   )
  :(<div className={classes.container}>
       <h5>No profile found, Please login again!!!  </h5>
     <div>
       <Link to="/login"><Button name="login" /></Link>
       {' '}
       <Link to="/register"><Button name="Register"/></Link>
      
     </div>
    </div>)) 
  : (<h5>loading....</h5>) 

    return profileMarkup;
}

Profile.prototypes={
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
 }

const mapStateToProps=(state)=>({
    user: state.user,
 
 })

 const mapDispatchToProps=(dispatch)=>{
  return {
     uploadImage:function(formData){
     dispatch(uploadImage(formData))
  }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
