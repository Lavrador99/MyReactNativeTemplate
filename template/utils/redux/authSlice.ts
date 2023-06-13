import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {persistReducer} from 'redux-persist';
import type {RootState} from './store';

// Define a type for the slice state
interface AuthState {
  token: string | null;
  deviceId: string | null;
  currentRoute: string | null;
}

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

// Define the initial state using that type
const initialState: AuthState = {
  deviceId: null,
  token: 'asdfasfsafd',
  currentRoute: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
      axios.defaults.headers.UDID = action.payload;
    },
    loginAction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      axios.defaults.headers.Authorization = action.payload;
    },
    logout: state => {
      console.log(state.token);
      state.token = null;
      delete axios.defaults.headers.Authorization;
    },
    setCurrentRouteName: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const {
  loginAction: loginAction,
  logout: logout,
  setDeviceId: setDeviceId,
  setCurrentRouteName: setCurrentRouteName,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isLoggedInSelector = (state: RootState) => !!state.auth.token;

export default persistReducer(persistConfig, authSlice.reducer);
