import { AuthStack } from '@navigation/AuthStack';
import { MainTabs } from '@navigation/MainTabs';
import { useAuthStore } from '@stores/authStore';
import React from 'react';
export function RootNavigator() {
  const token = useAuthStore(state => state.token);
  return token ? <MainTabs key="main" /> : <AuthStack key="auth" />;
}

