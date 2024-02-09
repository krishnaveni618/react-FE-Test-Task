import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'people/fetchData',
  async (search = '') => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${search}`
    );

    return response.json();
  }
);

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
      });
  },
});

export const selectPeople = (state) => state.people;

export default peopleSlice.reducer;
