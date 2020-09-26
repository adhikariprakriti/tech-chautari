import React,{useState}from 'react';
import Button from '../../components/button/button';
import classes from './login.module.css'
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
//redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../../redux/actions/userActions';


const useStyles=makeStyles({
     customError:{
        color:"red",
        fontSize:"1rem",
        marginBottom:"10px"
     }
})

const Login=(props)=>{
  const history=useHistory();
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [errors,setErrors]=useState(null)
  const handleSubmit=(e)=>{
       e.preventDefault();
       const userData={
          email,
          password
       }

   props.loginUser(userData,history)
   }
   
   const style=useStyles();

  return ( 


 <div className="container" >  
     <div className={classes.sub_container}>
        <div className={classes.title}>
            <h1>Welcome Back !!!</h1>
            <p> Please login with your credentials so that you can explore more.</p>
        </div>
      
      <form noValidate onSubmit={handleSubmit}>
         <div className={classes.form_wrapper}>
            <label for="">Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
         </div>

         <div className={classes.form_wrapper}>
            <label for="">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
         </div>
         
         <Button name="Log In" />
        </form>        
     </div>
  </div>
   
  );
}

loginUser.prototypes={
   loginUser: PropTypes.func.isRequired,
   UI: PropTypes.object.isRequired,
   user:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
   user: state.user,
   UI:state.UI
})

const mapDispatchToProps=(dispatch)=>{
   return {
      loginUser:function(userData,history){
      dispatch(loginUser(userData,history))
   }
}
}
 

export default connect(mapStateToProps,mapDispatchToProps)(Login);

