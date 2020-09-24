import React,{Fragment,useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';
import Button from '../button/button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import classes from './editProfile.module.css'

const Editprofile=(props)=>{

const [bio,setBio]= useState('');
const [website,setWebsite]= useState('');
const [location,setLocation]= useState('');
const [open,setOpen]= useState(false);


const mapUserDetailsToState=()=>{
  setBio(props.credentials.bio?props.credentials.bio:'')
  setWebsite(props.credentials.website?props.credentials.website:'')
  setLocation(props.credentials.location?props.credentials.location:'')
}


const handleOpen=()=>{
   setOpen(true)
   mapUserDetailsToState()  
}

const handleClose=()=>{
  setOpen(false)
  //mapUserDetailsToState()  
}

const handleSubmit=(e)=>{
  e.preventDefault();
  const userDetails={
     bio,
     website,
     location
  }

props.editUserDetails(userDetails)
handleClose(); 
}



return (
    <Fragment>
      <div>
         <Button name="Edit Profile" onClick={handleOpen}/>
      </div>
      <Dialog open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="sm" >
         <DialogTitle className={classes.title}>Edit Profile</DialogTitle>
         <DialogContent>
            <form>
              <TextField
                  name="bio"
                  type="text"
                  label="Bio"
                  multiline
                  rows="3"
                  placeholder="A short bio about yourself"
                  value={bio}
                  className={classes.input}
                  onChange={event=>setBio(event.target.value)}
                  fullWidth
              />
              <TextField 
                  name="website"
                  label="Website"
                  placeholder="your personal/professional website"
                  value={website}
                  className={classes.input}

                  onChange={event=>setWebsite(event.target.value)}
                  fullWidth
              />
              <TextField 
                  name="location"
                  type="text"
                  label="Location"
                  placeholder="Your location"
                  value={location}
                  className={classes.input}

                  onChange={event=>setLocation(event.target.value) }
                  fullWidth
              />
            </form>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} name="Cancel"/>
           <Button onClick={handleSubmit} name="Save"/>
         </DialogActions>
      </Dialog>
    </Fragment>
   
  );
}


const mapStatetoProps=(state)=>({
     credentials:state.user.userdata
})

const mapDispatchToProps=(dispatch)=>{
    return {
        editUserDetails:function(userDetails){
       dispatch(editUserDetails(userDetails))
    }}}

export default connect(mapStatetoProps,mapDispatchToProps)(Editprofile);
