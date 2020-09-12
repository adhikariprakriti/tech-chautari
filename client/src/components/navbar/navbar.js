import React from 'react';
import {Link} from 'react-router-dom';
import classes from './navbar.module.css';
const Navbar=()=>{
  return (
    
      <nav className={classes.header}>
          <div className={classes.headerNavigation}>
              <Link to="/register" className={classes.header__link}>
              <div className={classes.header__option}>Register</div>
              </Link>

              <Link to="/" className={classes.header__link}>
              <div className={classes.header__option}>Home</div>
              </Link>

              <Link to="/login" className={classes.header__link}>
              <div className={classes.header__option}>Login</div>
              </Link>

          </div>
      </nav>
    
  );
}

export default Navbar;

