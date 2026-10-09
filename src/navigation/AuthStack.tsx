import type { AuthParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@screens/LoginScreen';
import React from 'react';
const Stack = createNativeStackNavigator<AuthParamList>();
export function AuthStack() {
  return <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>;
}

