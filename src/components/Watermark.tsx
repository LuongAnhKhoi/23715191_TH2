import { STUDENT,examStamp } from '@constants/student';
import { theme } from '@constants/theme';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
export function Watermark() {
  return <View style={styles.wrap}><Text testID="watermark" style={styles.text}>
    TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
  </Text></View>;
}
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 10, paddingVertical: 9, backgroundColor: '#DBEAFE',
    borderColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth},
  text: {fontSize: 11, fontWeight: '700', color: theme.text, textAlign: 'center'},
});

