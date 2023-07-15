import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//create Exp action
export const createIncomeAction = createAsyncThunk(
  'income/createInc',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.post('api/income', payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

//fetch all action
export const fetchAllIncomeAction = createAsyncThunk(
  'income/fetch-all',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.get(`api/income?page=${payload}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const updateIncomeAction = createAsyncThunk(
  'income/update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.put(`api/income/${payload?.id}`, payload, config);
      console.log(payload);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

const incomeSlices = createSlice({
  name: 'income',
  initialState: {},
  extraReducers: (builder) => {
    //create Income
    builder.addCase(createIncomeAction.pending, (state, action) => {
      state.incLoading = true;
    });
    builder.addCase(createIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeCreated = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(createIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.msg;
      state.incServerErr = action?.error?.msg;
    });

    //fetch All Income
    builder.addCase(fetchAllIncomeAction.pending, (state, action) => {
      state.incLoading = true;
    });
    builder.addCase(fetchAllIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeList = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(fetchAllIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.msg;
      state.incServerErr = action?.error?.msg;
    });

    //update Income
    builder.addCase(updateIncomeAction.pending, (state, action) => {
      state.incLoading = true;
    });
    builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
      state.incLoading = false;
      state.incomeUpdated = action?.payload;
      state.incAppErr = undefined;
      state.incServerErr = undefined;
    });
    builder.addCase(updateIncomeAction.rejected, (state, action) => {
      state.incLoading = false;
      state.incAppErr = action?.payload?.msg;
      state.incServerErr = action?.error?.msg;
    });
  },
});

export default incomeSlices.reducer;
