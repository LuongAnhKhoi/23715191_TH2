import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { ROOM_LABEL } from '@constants/student';
import { theme } from '@constants/theme';
import type { ShopParamList } from '@navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
export function HomeScreen({navigation}: NativeStackScreenProps<ShopParamList, 'Home'>) {
  return <Screen><View style={styles.content}>
    <Text style={styles.title}>KTXGO</Text><Text style={styles.text}>Giao tận {ROOM_LABEL}</Text>
    <Action label="Xem chi tiết" onPress={() => navigation.navigate('Detail', {id: '1'})} />
  </View></Screen>;
}
const styles = StyleSheet.create({content: {padding: 24, gap: 16},
  title: {fontSize: 30, fontWeight: '900', color: theme.primary}, text: {color: theme.text}});

