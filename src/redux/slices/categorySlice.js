import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currentCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCategories, setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;