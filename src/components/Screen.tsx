import { Watermark } from '@components/Watermark';
import { VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import React from 'react';
import { StyleSheet,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export function Screen({children, detail = false, auth = false}: {children: React.ReactNode; detail?: boolean; auth?: boolean}) {
  return <SafeAreaView edges={auth ? ['top', 'left', 'right', 'bottom'] : detail ? ['left', 'right'] : ['top', 'left', 'right']}
    style={styles.screen}>
     {VARIANT.watermarkAtTop && <Watermark />}
    <View style={styles.body}>{children}</View>
     {!VARIANT.watermarkAtTop && <Watermark />}
  </SafeAreaView>;
}
const styles = StyleSheet.create({screen: {flex: 1, backgroundColor: theme.background}, body: {flex: 1}});

