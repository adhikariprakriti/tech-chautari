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



const Profile=(props)=>{
const {img,username,email,created_at,website,bio,location}=props.user.userdata

let profileMarkup=!props.user.loading?
               (props.user.authenticated?
                (
                  <div className={classes.container}>
         <div className={classes.profile_image}>
           <img src={img ? img : avatar} alt="profile" />    
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
              <EmailIcon/>{' '}<span>{email}</span>
            </Fragment>
            
          }
          
        </div>
        <div>
          {
            location &&
            <Fragment>
               <LocationOnIcon/>{' '}<span>{location}</span>
            </Fragment>
          }
          
        </div>
        <div>
          {
            website &&
            <Fragment>
                 <LinkIcon/>
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
                  <CalendarToday />{' '}<span>Joined {dayjs(created_at).format('MMM YYYY')}</span>
            </Fragment>
          } 
        </div>
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
    classes:PropTypes.object.isRequired
 }

const mapStateToProps=(state)=>({
    user: state.user,
   
 })

export default connect(mapStateToProps)(Profile);
