import {SET_USER,LOADING_USER, SET_AUTHENTICATED,SET_UNAUTHENTICATED} from '../types';

const initialState={
    authenticated: false,
    loading:false,
    userdata: {},
    likes: [],
    notifications: []
}

export default function(state=initialState,action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
            case SET_UNAUTHENTICATED:
                return initialState;
            case SET_USER:
                return{
                    ...state,
                    authenticated: true,
                    loading:false,
                    userdata:action.payload
                }
          case LOADING_USER:
                    return{
                        ...state,
                        loading: true
                    };
        default:
            return state;
    }
}