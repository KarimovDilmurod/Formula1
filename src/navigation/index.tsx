import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { TNavigationParams } from '../types/navigation';
import DriversListScreen from '../screens/DriversListScreen';
import DetailScreen from '../screens/DetailScreen';
import RaceResultScreen from '../screens/RaceResultScreen';

const RootStack = createStackNavigator<TNavigationParams>();

const Navigator = () => {
  const navigationRef = useNavigationContainerRef<TNavigationParams>();
  // @ts-ignore
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}>
      <RootStack.Navigator
        initialRouteName="DriversListScreen"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="DriversListScreen" component={DriversListScreen} />
        <RootStack.Screen name="DetailScreen" component={DetailScreen} />
        <RootStack.Screen name="RaceResultScreen" component={RaceResultScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
