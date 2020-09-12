import React from 'react';
import Button from '../../components/button/button';
import classes from './login.module.css'
const Login=()=>{
  return (
    
       <div className="container">
       
       
     <div className={classes.sub_container}>
        <div className={classes.title}>
            <h1>Welcome Back !!!</h1>
            <p> Please login with your credentials so that you can explore more.</p>
        </div>


        <form>
           

            <div className={classes.form_wrapper}>
                  <label for="">Email</label>
                  <input type="text" />
            </div>

            <div className={classes.form_wrapper}>
               <label for="">Password</label>
               <input type="text" />
            </div>
            <Button name="Log In"/>
        </form>
         
     </div>
    

  </div>
   
  );
}

export default Login;

