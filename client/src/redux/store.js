import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'


import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState={};
const middleware=[thunk,logger];

const reducers=combineReducers({
    user:userReducer,
    data:dataReducer,
    UI:uiReducer
});

const store=createStore(
    reducers,
    initialState,
   compose(applyMiddleware(...middleware))
   )

export default store;

//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()




