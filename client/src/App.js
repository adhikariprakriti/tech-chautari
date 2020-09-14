import React from 'react';
import './App.css';
import {  BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Registration from './pages/registration/registration'
import Login from './pages/login/login';
import Home from './pages/home/home'

function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/register' component={Registration} exact/>
              <Route path='/login' component={Login} exact/>

          </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
