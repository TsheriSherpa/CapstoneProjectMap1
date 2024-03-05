import { combineReducers } from "redux";
import favoriteReducer from './favoriteSlice';

const rootReducer = combineReducers({ 
    favorites: favoriteReducer,
});

export default rootReducer