import React,{useState,Fragment} from 'react';
import Button from '../button/button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {submitComment,getScream} from '../../redux/actions/dataActions'

const ComponentForm=(props)=>{
     const {screamId}=props
    const [body,setBody]=useState('')
    const handleSubmit=(e)=>{
           e.preventDefault()
           props.submitComment(screamId,{body:body})
           console.log("form submitted")
    }
    const commentMarkup=props.authenticated ?(
          <Grid item sm={12} style={{textAlign: 'çenter'}}>
          <form onSubmit={handleSubmit} >
             <TextField
                 name="body"
                 type="text"
                 label="Comment on scream"
                 value={body}
                 onChange={e=>setBody(e.target.value)}
                 fullWidth
                 ></TextField>
            <Button name="Submit"/>
          </form>
          </Grid>
    ):null
  return (
    <div>
      {commentMarkup}
    </div>
  );
}

const mapStateToProps=state=>({
    UI:state.UI,
    authenticated: state.user.authenticated
})

const mapDispatchToProps=(dispatch)=>{
    return {
   getScream:(screamId)=>{
    dispatch(getScream(screamId))
  },
  submitComment:(screamId,commentData)=>{
    dispatch(submitComment(screamId,commentData))
  }, 
  }
  }
  


export default connect(mapStateToProps,mapDispatchToProps)(ComponentForm);
