import React,{Fragment,useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../button/button';

function DeleteScreams(props) {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
       setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
}

const deleteScream=()=>{
  console.log(props.screamId)
  props.deleteScream(props.screamId)
  setOpen(false)
}

  return (
    <Fragment>
       <IconButton onClick={handleOpen} style={{ width: "35px", height:"35px",left:"80%"}}>
           <DeleteOutline style={{color:"red"}}/>
       </IconButton>
        <Dialog 
             open={open} 
             onClose={handleClose}
             fullWidth
             maxWidth="sm">
               <DialogTitle>
                  Are You Sure you want to delete Scream?
               </DialogTitle>
        <DialogActions>
           <Button onClick={handleClose} name="Cancel"/>
           <Button onClick={deleteScream} name="Delete"/>
         </DialogActions>
        </Dialog>
    </Fragment>
  );
}

const mapDispatchToProps=(dispatch)=>{
  return {
      deleteScream:function(screamId){
     dispatch(deleteScream(screamId))
  }}}

export default connect(null,mapDispatchToProps)(DeleteScreams);
