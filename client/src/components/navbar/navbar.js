import React from 'react';
import {Link} from 'react-router-dom';
import classes from './navbar.module.css';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';


const Navbar=(props)=>{

  return (
    <nav className={classes.header}>
       <div className={classes.headerNavigation}>
           <Link to="/" className={classes.header__link}>
                 <div className={classes.header__option}>Home</div>
           </Link>
    {
    (props.user.authenticated) ? 
    (
        <Link to="/" className={classes.header__link}>
          <div onClick={props.logoutUser} className={classes.header__option}>Logout</div>
        </Link>

     ):( 
          <React.Fragment>
              <Link to="/register" className={classes.header__link}>
                 <div className={classes.header__option}>Register</div>
              </Link>
 
              <Link to="/login" className={classes.header__link}>
                 <div className={classes.header__option}>Login</div>
              </Link>
          </React.Fragment>

     )
     }
      </div>
    </nav>     
  );
}


const mapStateToProps=(state)=>({
    user: state.user,
 })

 const mapDispatchToProps=(dispatch)=>{
    return {
        logoutUser:function(){
              dispatch(logoutUser())
           }
           }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);

