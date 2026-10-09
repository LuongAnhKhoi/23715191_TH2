import { theme } from '@constants/theme';
import React from 'react';
import { StyleSheet,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export function Screen({children, detail = false, auth = false}: {children: React.ReactNode; detail?: boolean; auth?: boolean}) {
  return <SafeAreaView edges={auth ? ['top', 'left', 'right', 'bottom'] : detail ? ['left', 'right'] : ['top', 'left', 'right']}
    style={styles.screen}>
    
    <View style={styles.body}>{children}</View>
    
  </SafeAreaView>;
}
const styles = StyleSheet.create({screen: {flex: 1, backgroundColor: theme.background}, body: {flex: 1}});

