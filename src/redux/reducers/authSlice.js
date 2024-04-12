// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
        isLoggedIn: false,
        error: ""
	},
	reducers: {
		login: (state, action) => {
            state.user = action.user
            state.isLoggedIn = true
        },
        logout: (state, action) => {
            state.user = null
            state.isLoggedIn = false
        }
	},
});

export const {
    login,
    logout
} = authSlice.actions;

export const selectIsLoggedIn = (state) => {
	return state.auth.isLoggedIn;
}

export default authSlice.reducer;
