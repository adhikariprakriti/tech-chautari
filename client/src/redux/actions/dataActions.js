import {SET_SCREAMS,SUBMIT_COMMENT,STOP_LOADING_UI,POST_SCREAM,LOADING_DATA,LIKE_SCREAM,DELETE_SCREAM,UNLIKE_SCREAM,GET_SCREAM,LOADING_UI, CLEAR_ERRORS, SET_ERRORS} from '../types';
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
    dispatch({type: LOADING_UI});
    axios.get(`http://localhost:5000/scream/${screamId}/like`)
    .then(res=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        }) 
    dispatch({type:STOP_LOADING_UI})

    }).catch((err)=>console.log(err))
}


//get particular scream
export const getScream=(screamId)=>dispatch=>{
    dispatch({type: LOADING_UI});
    axios.get(`http://localhost:5000/screams/${screamId}`)
    .then(res=>{
        dispatch({
            type:GET_SCREAM,
            payload:res.data
        }) 
        dispatch({type:STOP_LOADING_UI})
    }).catch((err)=>console.log(err))
}



//unlike a scream
export const unlikeScream=(screamId)=>dispatch=>{
   // dispatch({type: LOADING_UI});
    axios.get(`http://localhost:5000/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        }) 
      dispatch({type:STOP_LOADING_UI})
    }).catch((err)=>console.log(err))
}

//submit comment
export const submitComment=(screamId,commentData)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post(`http://localhost:5000/scream/${screamId}/comment`,commentData)
    .then(res=>{
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        });
        dispatch(clearErrors());
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
    dispatch({type:STOP_LOADING_UI})

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

export const postScream=(newScream)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post(`http://localhost:5000/screams`,newScream)
    .then(res=>{
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });
        dispatch({
            type: CLEAR_ERRORS
        })
    }).catch(err=>{
        dispatch({
            type: POST_SCREAM,
            payload: (err.response.data.msg)?err.response.data.msg:err.response.data
        })
    })
}

export const clearErrors=()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}