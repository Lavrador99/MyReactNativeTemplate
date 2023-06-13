import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

// Define a type for the slice state
interface UserState {
  imageURL: string;
  firstName: string;
  lastName: string;
}

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

// Define the initial state using that type
const initialState: UserState = {
  imageURL: '',
  firstName: '',
  lastName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setImageURL: (state, action: PayloadAction<string>) => {
      state.imageURL = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});

export const {setImageURL, setFirstName, setLastName} = userSlice.actions;

export default persistReducer(persistConfig, userSlice.reducer);
