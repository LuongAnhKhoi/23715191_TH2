import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { examStamp,formatMoney,ROOM_LABEL,STUDENT,VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useAuthStore } from '@stores/authStore';
import React from 'react';
import { ScrollView,StyleSheet,Text,View } from 'react-native';
export function MeScreen() {
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const location = useCampusLocation();
  return <Screen><View style={styles.header}><Text style={styles.headerText}>TÔI · KTXGO</Text></View>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.name}>{STUDENT.hoTen}</Text>
      <Text style={styles.identity}>{STUDENT.mssv} · #{examStamp()}</Text>
      <Text style={styles.identity}>Phòng giao: {ROOM_LABEL}</Text>
      <Text style={styles.identity}>Token: {token ? token.slice(0, 9) + '…' + token.slice(-6) : 'Chưa đăng nhập'}</Text>
      
<View style={styles.panel}>
  <Text style={[styles.permission, location.permission === 'granted' && styles.granted]}>Quyền: {location.permission}</Text>
  {location.km !== null && <Text style={styles.text}>≈ {location.km.toFixed(2)} km tới cổng KTX</Text>}
  {location.fee !== null && <><Text style={styles.muted}>Phí ship ước tính · Công thức {VARIANT.shipFormula}</Text>
    <Text style={styles.fee}>{formatMoney(location.fee)}</Text></>}
  {location.permission === 'unknown' && <Text style={styles.muted}>Bấm lấy vị trí để Android hỏi quyền truy cập và ước tính phí giao hàng.</Text>}
  {location.permission === 'denied' && <Text style={styles.muted}>Bạn chưa cho phép vị trí. Có thể xin quyền lại hoặc mở Cài đặt để cấp quyền.</Text>}
  {location.permission === 'blocked' && <Text style={styles.muted}>Quyền đã bị chặn. Mở Cài đặt để cấp quyền vị trí.</Text>}
  {!!location.error && <Text accessibilityRole="alert" style={styles.error}>{location.error}</Text>}
</View>
{location.permission !== 'blocked' &&
  <Action label={location.loading ? 'Đang lấy vị trí…' : 'Lấy vị trí ước tính ship'}
    disabled={location.loading} onPress={() => {void location.requestLocation();}} />}
{(location.permission === 'denied' || location.permission === 'blocked') &&
  <Action label="Mở Cài đặt" outline onPress={() => {void location.openSettings();}} />}

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

