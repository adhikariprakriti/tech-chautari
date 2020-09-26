import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,DELETE_SCREAM,UNLIKE_SCREAM,GET_SCREAM} from '../types';
import axios from 'axios';

export const getScreams=()=>dispatch=>{
    dispatch({type:LOADING_DATA})
    axios.get('http://localhost:5000/screams')
    .then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data
        })
    }).catch((err)=>console.log(err))
}

//like a scream
export const likeScream=(screamId)=>dispatch=>{
    axios.get(`http://localhost:5000/scream/${screamId}/like`)
    .then(res=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        }) 
    }).catch((err)=>console.log(err))
}


//get particular scream
export const getScream=(screamId)=>dispatch=>{
    axios.get(`http://localhost:5000/screams/${screamId}`)
    .then(res=>{
        dispatch({
            type:GET_SCREAM,
            payload:res.data
        }) 
    }).catch((err)=>console.log(err))
}



//unlike a scream
export const unlikeScream=(screamId)=>dispatch=>{
    axios.get(`http://localhost:5000/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        }) 
    }).catch((err)=>console.log(err))
}

//delete Scream
export const deleteScream=(screamId)=>(dispatch)=>{
    axios.delete(`http://localhost:5000/screams/${screamId}`)
    .then(()=>{
        dispatch({
            type:DELETE_SCREAM,
            payload:screamId
        })
    }).catch(err=>console.log(err))
}