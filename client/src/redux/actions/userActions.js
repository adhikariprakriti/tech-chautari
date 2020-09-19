import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_UNAUTHENTICATED,LOADING_USER} from '../types';
import axios from 'axios';

const setAuthorizationHeader=(token)=>{
    const FBIdToken=`Bearer ${token}`
       localStorage.setItem('FBIdToken',FBIdToken);
       axios.defaults.headers.common['Authorization']=FBIdToken;
       
}

  export const loginUser=(userData,history)=>(dispatch)=>{
    dispatch({type: LOADING_UI})
    axios.
    post('http://localhost:5000/api/login',userData)
    .then(res=>{     
       setAuthorizationHeader(res.data.token)
       dispatch(getUserData());
       dispatch({type: CLEAR_ERRORS});
       // history.push('/');    
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.msg
        })
     alert(err.response.data.msg)
     })
  }         



  export const RegisterUser=(userData,history)=>(dispatch)=>{
    dispatch({type: LOADING_UI})
    axios.
    post('http://localhost:5000/api/register',userData)
    .then(res=>{     
       setAuthorizationHeader(res.data.token)
       dispatch({type: CLEAR_ERRORS});
       dispatch(getUserData());

       // history.push('/');    
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: (err.response)?.data.msg
        })
     alert(err.response.data.msg)
     })
  }         


export const logoutUser=()=>(dispatch)=>{

     localStorage.removeItem('FBIdToken');
     delete axios.defaults.headers.common['Authorization']
     dispatch({type : SET_UNAUTHENTICATED});

    }

  export const getUserData=()=>(dispatch)=>{
    dispatch({type : LOADING_USER});
     axios.get("http://localhost:5000/user")
     .then(res=>{
         dispatch({
             type: SET_USER,
             payload:res.data.userdata
         })
     }).catch(err=>console.log(err));
  }

  