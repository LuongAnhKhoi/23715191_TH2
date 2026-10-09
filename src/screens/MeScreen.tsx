import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { examStamp,ROOM_LABEL,STUDENT } from '@constants/student';
import { theme } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import React from 'react';
import { ScrollView,StyleSheet,Text,View } from 'react-native';

export function MeScreen() {
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  
  return <Screen><View style={styles.header}><Text style={styles.headerText}>TÔI · KTXGO</Text></View>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.name}>{STUDENT.hoTen}</Text>
      <Text style={styles.identity}>{STUDENT.mssv} · #{examStamp()}</Text>
      <Text style={styles.identity}>Phòng giao: {ROOM_LABEL}</Text>
      <Text style={styles.identity}>Token: {token ? token.slice(0, 9) + '…' + token.slice(-6) : 'Chưa đăng nhập'}</Text>
      
      <Action label="Đăng xuất" danger onPress={logout} />
    </ScrollView>
  </Screen>;
}
const styles = StyleSheet.create({
  header: {backgroundColor: theme.primary, padding: 18}, headerText: {color: theme.surface,
    fontSize: 18, fontWeight: '800', textAlign: 'center'}, content: {padding: 20, gap: 16},
  name: {color: theme.text, fontSize: 18, fontWeight: '800', textAlign: 'center'},
  identity: {color: theme.textLight, textAlign: 'center'}, panel: {padding: 18,
    backgroundColor: theme.surface, borderRadius: 16, borderWidth: 1, borderColor: theme.border, gap: 12},
  permission: {color: theme.text, fontWeight: '700'}, granted: {color: theme.success},
  text: {color: theme.text}, muted: {color: theme.textLight, lineHeight: 21},
  fee: {fontSize: 22, color: theme.secondary, fontWeight: '800'}, error: {color: theme.error},
});

