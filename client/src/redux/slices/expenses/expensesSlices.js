import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//create Exp action
export const createExpAction = createAsyncThunk(
  'expense/createExpense',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.post('api/expense', payload, config);
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
export const fetchAllExpAction = createAsyncThunk(
  'expense/fetch-all',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.get(`api/expense?page=${payload}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const updateExpAction = createAsyncThunk(
  'expense/update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const { data } = await axios.put(`api/expense/${payload?.id}`, payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

const expenseSlices = createSlice({
  name: 'expenses',
  initialState: {},
  extraReducers: (builder) => {
    //create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.expLoading = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseCreated = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.msg;
      state.expServerErr = action?.error?.msg;
    });

    //fetch All Expenses
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.expLoading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expensesList = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.msg;
      state.expServerErr = action?.error?.msg;
    });

    //update Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
      state.expLoading = true;
    });
    builder.addCase(updateExpAction.fulfilled, (state, action) => {
      state.expLoading = false;
      state.expenseUpdated = action?.payload;
      state.expAppErr = undefined;
      state.expServerErr = undefined;
    });
    builder.addCase(updateExpAction.rejected, (state, action) => {
      state.expLoading = false;
      state.expAppErr = action?.payload?.msg;
      state.expServerErr = action?.error?.msg;
    });
  },
});

export default expenseSlices.reducer;
