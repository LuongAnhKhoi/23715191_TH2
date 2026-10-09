import { Screen } from '@components/Screen';
import { theme } from '@constants/theme';
import type { ShopParamList } from '@navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
export function DetailScreen({route}: NativeStackScreenProps<ShopParamList, 'Detail'>) {
  return <Screen detail><View style={styles.content}><Text style={styles.title}>Chi tiết món</Text>
    <Text style={styles.text}>Mã món: {route.params.id}</Text></View></Screen>;
}
const styles = StyleSheet.create({content: {padding: 24, gap: 12},
  title: {fontSize: 24, color: theme.primary}, text: {color: theme.text}});

