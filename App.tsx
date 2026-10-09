// TH2 | 23715191 | LUONG ANH KHOI | #353533

import { theme } from '@constants/theme';
import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const queryClient = new QueryClient();
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={{dark: false, colors: {
          primary: theme.primary, background: theme.background, card: theme.surface,
          text: theme.text, border: theme.border, notification: theme.secondary,
        }, fonts: {
          regular: {fontFamily: 'sans-serif', fontWeight: '400'},
          medium: {fontFamily: 'sans-serif-medium', fontWeight: '500'},
          bold: {fontFamily: 'sans-serif', fontWeight: '700'},
          heavy: {fontFamily: 'sans-serif', fontWeight: '900'},
        }}}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

