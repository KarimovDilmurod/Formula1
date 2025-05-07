import React, {useEffect} from 'react';
import {
  LogBox,
  Platform,
  StyleSheet,
  Text,
  UIManager,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './state';
import AppLogic from './AppLogic';
import Navigator from './navigation';

LogBox.ignoreLogs([
  'new NativeEventEmitter',
  'RCTBridge',
  '[react-native-gesture-handler]',
]);

//@ts-ignore
Text.defaultProps = Text.defaultProps || {};
//@ts-ignore
Text.defaultProps.allowFontScaling = false;

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <AppLogic>
                <Navigator />
              </AppLogic>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
