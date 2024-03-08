// favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState: {
		list: [],
	},
	reducers: {
		toggleFavorite: (state, action) => {
			const newItem = action.payload;
			
			if (state.list.some(item => item.id == newItem.id)) {
				state.list = state.list.filter(item => item.id !== newItem.id);
			}else{
				state.list.push(newItem);
			}
		}
	},
});

export const {
	toggleFavorite,
} = favoriteSlice.actions;

export const selectIsFavourite = (state, itemToCheck) => {
	return state.favorite.list.some(item => item.id == itemToCheck.id)
}

export default favoriteSlice.reducer;
