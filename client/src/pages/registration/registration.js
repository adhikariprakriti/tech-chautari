import React ,{useState} from 'react';
import './registration.css'
import Button from '../../components/button/button'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {RegisterUser} from '../../redux/actions/userActions';


const Registration=(props)=>{

   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [password_repeat,setPassword_repeat]=useState('')
   const [FirstName,setFirstName]=useState('')
   const [LastName,setLastName]=useState('')
   const [loading,setLoading]=useState('')
   const history=useHistory();


   const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      const userData={
         username:FirstName+LastName,
         email,
         password,
         password_repeat
      }
  
      props.RegisterUser(userData,history)


  }

  return (
    <div className="container"> 
     <div className="sub_container">
        <div className="title">
            <h1>Welcome To Tech-Chautari</h1>
            <p> We are excited to have you join our online family.Lets get you register so tahat you can explore more.</p>
        </div>


        <form noValidate onSubmit={handleSubmit}>
           <div className="form_group">
              <div className="form_wrapper">
                  <label for="">First Name</label>
                  <input type="text" value={FirstName} onChange={(e)=>setFirstName(e.target.value)}/>
              </div>
              <div className="form_wrapper">
                  <label for="">Last Name</label>
                  <input type="text" value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
              </div>
            </div>

            <div className="form_wrapper">
                  <label for="">Email</label>
                  <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="form_wrapper">
               <label for="">Password</label>
               <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className="form_wrapper">
               <label for="">Confirm Password</label>
               <input type="password" value={password_repeat} onChange={(e)=>setPassword_repeat(e.target.value)} />
            </div>

            <Button name="Register"/>
        </form>
         
     </div>
     <div className="end">
          <p>By Signing up I accept the <span>Terms & Conditions</span> and the <span>Privacy Policy .</span></p>
     </div>
  </div>
  );
}

const mapStateToProps=(state)=>({
   user: state.user,
   UI:state.UI
})

const mapDispatchToProps=(dispatch)=>{
   return {
      RegisterUser:function(userData,history){
      dispatch(RegisterUser(userData,history))
   }
}
}
 

export default connect(mapStateToProps,mapDispatchToProps)(Registration);


