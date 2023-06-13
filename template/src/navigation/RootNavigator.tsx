import {
  NavigationContainer,
  NavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useRef} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {
  isLoggedInSelector,
  setCurrentRouteName,
} from '../../utils/redux/authSlice';
import {store, useAppDispatch, useAppSelector} from '../../utils/redux/store';

import AuthenticationStack, {
  NonAuthenticatedStackParamList,
} from './AuthenticationStack';
import MainStack from './MainStack';

export type RootStackParamList = {
  NonAuthenticated: NavigatorScreenParams<NonAuthenticatedStackParamList>;
  Authenticated: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const dispatch = useAppDispatch();
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList> | null>(null);
  const routeNameRef = useRef<string | undefined>();

  const onRefIsReady = useCallback(() => {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
    }
  }, []);

  const onStateChange = useCallback(async () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    const previousRouteName = store.getState().auth.currentRoute;

    if (currentRouteName) {
      dispatch(setCurrentRouteName(currentRouteName));
    }

    if (previousRouteName !== currentRouteName) {
      try {
      } catch (error) {
        // console.log(error);
      }
    }
  }, [dispatch]);

  const navContainer = useMemo(
    () => (
      <NavigationContainer
        ref={navigationRef}
        onReady={onRefIsReady}
        onStateChange={onStateChange}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: 'white'},
          }}
          initialRouteName="NonAuthenticated">
          {!isLoggedIn ? (
            <Stack.Screen
              name="NonAuthenticated"
              component={AuthenticationStack}
            />
          ) : (
            <Stack.Screen name="Authenticated" component={MainStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    ),
    [isLoggedIn, onRefIsReady, onStateChange],
  );

  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {navContainer}
      </KeyboardAvoidingView>
    );
  } else {
    return navContainer;
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigator;
