//create a slice for the search page
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: {
      category: [],
      offer: "all",
      furnished: "all",
      parking: "all",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = searchSlice.actions;
export default searchSlice.reducer;
