import React,{Fragment,useState,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import {postScream,getScreams} from '../../redux/actions/dataActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../button/button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { CLEAR_ERRORS } from '../../redux/types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles({
    close:{
       color:"red",
    },
    icon:{
        left:"70%"
    },
})


const PostScream=(props)=>{
     const[open,setOpen]=useState(false)
     const[body,setBody]=useState('') 
     const[errors,setErrors]=useState({}) 
   
     const style=useStyles();

     const handleOpen=()=>{
         setOpen(true)
     }
     const handleClose=()=>{
        setOpen(false)
    }


    const handleSubmit=(event)=>{
       event.preventDefault();
       console.log(body)
       body?(
                props.postScream({body:body})):(
                alert("please fill up all the fields")
        )
        setOpen(false)

    }

     return(
          <Fragment>
            <Button onClick={handleOpen} name="Post Scream"/>
             <Dialog
                 open={open}
                 onClose={handleClose}
                 fullWidth
                 maxWidth="sm">
               <IconButton onClick={handleClose}  className={style.icon}>
                   <CloseIcon className={style.close}/>
               </IconButton>
                <DialogTitle className={style.title}>Post a new scream</DialogTitle>
                <DialogContent>
                    <form >
                        <TextField
                            name="body"
                            type="text"
                            label="Scream!!"
                            multiline
                            rows="3"
                            error={errors.body?true:false}
                            placeholder="Scream at your fellow apes"
                            helperText={errors.body}
                           onChange={e=>setBody(e.target.value)}
                           fullWidth
                           />
                    </form>
                    <div className={style.submit}>
                      <Button onClick={handleSubmit} name="Submit"/>
                    </div>

                </DialogContent>
                 </Dialog>
          </Fragment>
     ) 
}

const mapStateToProps=(state)=>({
    UI:state.UI,
    data:state.data
  })
  const mapDispatchToProps=(dispatch)=>{
    return {
      getScreams:()=>{
       dispatch(getScreams())
    },
    postScream:(newScream)=>{
        dispatch(postScream(newScream))

    }
}}
  

export default connect(mapStateToProps,mapDispatchToProps)(PostScream);