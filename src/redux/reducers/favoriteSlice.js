// favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState: {
		list: [],
	},
	reducers: {
		toggleFavorite: (state, action) => {
			console.log('hi')
			const item = action.payload;
			console.log(item)
			
			if (state.list.includes(item)) {
				state.list = state.list.filter(i => i !== item);
			}else{
				state.list.push(item);
			}
			console.log(state.list)
		}
	},
});

export const {
	toggleFavorite,
} = favoriteSlice.actions;

export const selectIsFavourite = (state, itemToCheck) => {
	return state.favorite.list.includes(itemToCheck)
}

export default favoriteSlice.reducer;
