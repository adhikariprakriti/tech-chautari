import {SET_USER,LOADING_USER,LIKE_SCREAM, SET_AUTHENTICATED,SET_UNAUTHENTICATED,UNLIKE_SCREAM} from '../types';

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

            case LIKE_SCREAM:
                return{
                    ...state,
                    likes:[
                        ...state.likes,
                        {
                            username: state.credentials.username,
                            screamId: action.payload.screamId
                        }
                    ]
                }

                case UNLIKE_SCREAM:
                    return{
                        ...state,
                        likes:state.likes.filter(
                            (like)=>like.screamId===action.payload.screamId
                        )
                    }
    
        default:
            return state;
    }
}