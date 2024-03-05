// favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    list: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const newItem = action.payload;
      state.list.push(newItem);
    },
    removeFromFavorites: (state, action) => {
      const itemIdToRemove = action.payload;
      state.list = state.list.filter(item => item.id !== itemIdToRemove);
    },
    clearFavorites: (state) => {
      state.list = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
