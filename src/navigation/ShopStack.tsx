import { VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import type { ShopParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailScreen } from '@screens/DetailScreen';
import { HomeScreen } from '@screens/HomeScreen';
import React from 'react';
const Stack = createNativeStackNavigator<ShopParamList>();
export function ShopStack() {
  return <Stack.Navigator screenOptions={{headerTintColor: theme.primary,
    headerStyle: {backgroundColor: theme.surface}, contentStyle: {backgroundColor: theme.background}}}>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'Chi tiết món',
      presentation: VARIANT.detailPresentation}} />
  </Stack.Navigator>;
}

