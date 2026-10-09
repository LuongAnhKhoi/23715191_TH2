import { Screen } from '@components/Screen';
import { theme } from '@constants/theme';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
export function CartScreen() {
  return <Screen><View style={styles.content}><Text style={styles.title}>GIỎ HÀNG</Text>
    <Text style={styles.text}>Giỏ hàng đang trống.</Text></View></Screen>;
}
const styles = StyleSheet.create({content: {padding: 24, gap: 16},
  title: {color: theme.primary, fontWeight: '700', fontSize: 24}, text: {color: theme.text}});

