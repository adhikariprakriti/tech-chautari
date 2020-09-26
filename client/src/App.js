import React from 'react';
import './App.css';
import {  BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Registration from './pages/registration/registration'
import Login from './pages/login/login';
import Home from './pages/home/home'
import AuthRoute from './components/AuthRoute';
import store from './redux/store.js';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {SET_AUTHENTICATED} from './redux/types';
import {getUserData} from './redux/actions/userActions';
import axios from 'axios';


const token = localStorage.FBIdToken;
if(token){
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
  }

function App(props) {
  return ( 
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Switch>
              <Route path='/' component={Home} exact/>
              <AuthRoute path='/register' component={Registration} authenticated={props.user.authenticated} exact/>
              <AuthRoute path='/login' component={Login} authenticated={props.user.authenticated} exact/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
     );
}


const mapStateToProps=(state)=>({
  user: state.user,
  UI:state.UI
})

export default connect(mapStateToProps)(App);
