import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAccountStatsAction = createAsyncThunk(
  'account/fetch',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.get(`api/accounts-statistics`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

const accountStatsSlices = createSlice({
  name: 'account',
  initialState: {},
  extraReducers: (builder) => {
    //fetch All Expenses
    builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.accountDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default accountStatsSlices.reducer;
