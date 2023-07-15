import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//register action
export const registerUserAction = createAsyncThunk(
  'user/register',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post('api/users/register', payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Login action
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post('api/users/login', payload, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
//profile
export const userProfileAction = createAsyncThunk(
  'user/profile',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.get('api/users/profile', config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
//update profile
export const updateProfileAction = createAsyncThunk(
  'user/updateProfile',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.put(
        'api/users/update',
        {
          firstname: payload?.firstname,
          lastname: payload?.lastname,
          email: payload?.email,
        },
        config,
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);



const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : undefined;
const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: userLoginFromStorage,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('userInfo');
      state.userAuth = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });

    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });
    //Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverApp = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverApp = action?.error?.msg;
    });

    //update profile
    builder.addCase(updateProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.userUpdate = action?.payload;
      state.isEdit = true;
      state.loading = false;
      state.appErr = undefined;
      state.serverApp = undefined;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverApp = action?.error?.msg;
    });
  },
});
export const checkAuth = (state) => state.users?.userAuth;

export default usersSlices.reducer;
export const { logout } = usersSlices.actions;
