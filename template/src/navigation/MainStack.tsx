import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {logout} from '../../utils/redux/authSlice';
import {useAppDispatch} from '../../utils/redux/store';
import {Profile} from '../pages/Profile';
import HomeStack, {HomeStackParamList} from './HomeStack';

export type MainStackParamList = {
  DrawerHome: NavigatorScreenParams<HomeStackParamList>;
  DrawerProfile: undefined;
};

const Drawer = createDrawerNavigator<MainStackParamList>();

const MainStack = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        if (
          response.data.InternalStatusCode === 401 ||
          response.data.InternalStatusCode === 403
        ) {
          dispatch(logout());
        }

        return response;
      },
      error => {
        if (
          error.response?.data?.status === 401 ||
          error.response?.data?.status === 403
        ) {
          dispatch(logout());
        }

        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen name="DrawerHome" component={HomeStack} />
      <Drawer.Screen name="DrawerProfile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MainStack;
