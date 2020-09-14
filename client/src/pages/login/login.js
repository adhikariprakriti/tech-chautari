import React,{useState,useEffect}from 'react';
import Button from '../../components/button/button';
import classes from './login.module.css'
import axios  from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';


const useStyles=makeStyles({
     customError:{
        color:"red",
        fontSize:"1rem",
        marginBottom:"10px"
     }
})
const Login=()=>{
   const errors={}
   const history=useHistory();
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [loading,setLoading]=useState(false);
  const handleSubmit=(e)=>{
       e.preventDefault();
       setLoading(true);
       const userData={
          email,
          password
       }
   
         axios.post('http://localhost:5000/api/login',userData)
         .then(res=>{
            setLoading(false)
            history.push('/')
         }).catch(err=>{
              alert((err.response)?.data.msg)  
            setLoading(false)
         })

   }

   const style=useStyles();

  return ( 
 <div className="container">  
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
         
         <Button name="Log In" disabled={loading}/>
        </form>        
     </div>
  </div>
   
  );
}

export default Login;

