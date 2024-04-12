import { combineReducers } from "redux";
import favoriteReducer from './favoriteSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({ 
    favorite: favoriteReducer,
    auth: authReducer
});

export default rootReducer