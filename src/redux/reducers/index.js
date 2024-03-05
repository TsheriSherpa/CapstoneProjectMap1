import { combineReducers } from "redux";
import favoriteReducer from './favoriteSlice';

const rootReducer = combineReducers({ 
    favorite: favoriteReducer
});

export default rootReducer