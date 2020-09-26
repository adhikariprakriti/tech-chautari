import {SET_SCREAMS,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM,GET_SCREAM, DELETE_SCREAM} from '../types';

const initialState={
    screams:[],
    scream:{},
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams:action.payload,
                loading:false
            } 

        case GET_SCREAM:
                return{
                    ...state,
                    scream:action.payload,
                    loading:false
                } 
        case DELETE_SCREAM:
                let index=state.screams.findIndex(scream=>scream.scream_id===action.payload)
                console.log(index)
                state.screams.splice(index,1);
            return{
                ...state
            }
            default: 
              return state
         }
}