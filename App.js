/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './App/Screens/redux/store';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './App/Screens/Login';
import Home from './App/Screens/Home';
import Cart from './App/Screens/Cart';
import CartSummary from './App/Screens/CartSummary';
import PlaceOrder from './App/Screens/PlaceOrder';
import AdminHome from './App/Screens/AdminHome';


const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='CartSummary' component={CartSummary} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='PlaceOrder' component={PlaceOrder} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
