import 'react-native-gesture-handler';

import axios from 'axios';
import React, {useMemo} from 'react';
import {AppState, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SWRConfig} from 'swr';
import RootNavigator from './src/navigation/RootNavigator';
import {swrFetcher} from './utils/const';
import {persistor, store} from './utils/redux/store';

const SetAxiosConfig = () => {
  const {token} = store.getState().auth;

  if (token) {
    axios.defaults.headers.Authorization = token;
  }
};

const App = () => {
  const value = useMemo(
    () => ({
      fetcher: swrFetcher,
      provider: () => new Map(),
      isVisible: () => {
        return true;
      },
      initFocus(callback: () => void) {
        let appState = AppState.currentState;

        const onAppStateChange = (nextAppState: any) => {
          /* If it's resuming from background or inactive mode to active one */
          if (
            appState.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            callback();
          }
          appState = nextAppState;
        };

        // Subscribe to the app state change events
        const subscription = AppState.addEventListener(
          'change',
          onAppStateChange,
        );

        return () => {
          subscription.remove();
        };
      },
    }),

    [],
  );
  return (
    <SWRConfig value={value}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
            onBeforeLift={SetAxiosConfig}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </SWRConfig>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
