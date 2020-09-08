import React from 'react';
import './registration.css'
import Button from '../../containers/button/button'
const Registration=()=>{
  return (
    <div className="container">
       <div className="container_signin">
           <p>Already have an account?</p>
           <button>Sign in</button>
        </div>
       
     <div className="sub_container">
        <div className="title">
            <h1>Welcome To Tech-Chautari</h1>
            <p> We are excited to have you join our online family.Lets get you register so tahat you can explore more.</p>
        </div>


        <form>
           <div className="form_group">
              <div className="form_wrapper">
                  <label for="">First Name</label>
                  <input type="text" />
              </div>
              <div className="form_wrapper">
                  <label for="">Last Name</label>
                  <input type="text" />
              </div>
            </div>

            <div className="form_wrapper">
                  <label for="">Email</label>
                  <input type="text" />
            </div>

            <div className="form_wrapper">
               <label for="">Password</label>
               <input type="text" />
            </div>

            <div className="form_wrapper">
               <label for="">Confirm Password</label>
               <input type="text" />
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

export default Registration