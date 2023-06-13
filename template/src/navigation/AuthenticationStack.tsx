import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {Login} from '../pages/Login';
import {SignUp} from '../pages/SignUp';
import {RootStackParamList} from './RootNavigator';

export type NonAuthenticatedStackParamList = {
  Login: undefined;
  SignUp: undefined;
  PasswordRecover: undefined;
};

const Stack = createNativeStackNavigator<NonAuthenticatedStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'NonAuthenticated'>;

const AuthenticationStack = ({}: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
