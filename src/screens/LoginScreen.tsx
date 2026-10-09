import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { STUDENT,VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import React,{ useState } from 'react';
import { KeyboardAvoidingView,Platform,ScrollView,StyleSheet,Text,TextInput,View } from 'react-native';
export function LoginScreen() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const isPhone = VARIANT.authField === 'phone';
  const submit = () => {
    if (!value.trim()) {setError(isPhone ? 'Nhập số điện thoại.' : 'Nhập email.'); return;}
    login();
  };
  return <Screen auth><KeyboardAvoidingView style={styles.grow}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>KTXGO</Text>
      <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>
      <View style={styles.form}>
        <Text style={styles.label}>{isPhone ? 'Số điện thoại' : 'Email'}</Text>
        <TextInput testID="login-input" accessibilityLabel={isPhone ? 'Số điện thoại' : 'Email'}
          value={value} onChangeText={next => {setValue(next); setError('');}}
          keyboardType={isPhone ? 'phone-pad' : 'email-address'} autoCapitalize="none"
          autoCorrect={false} placeholder={(isPhone ? 'Số điện thoại' : 'Email') + ' · ' + STUDENT.mssv}
          placeholderTextColor={theme.textLight} style={styles.input} onSubmitEditing={submit} />
        {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        <Action label="Vào cửa hàng" onPress={submit} testID="login-button" />
        <Text style={styles.note}>Đặt món nhanh · Giao tận nơi · Trả khi nhận</Text>
      </View>
    </ScrollView>
  </KeyboardAvoidingView></Screen>;
}
const styles = StyleSheet.create({
  grow: {flex: 1}, content: {flexGrow: 1, padding: 24, paddingTop: 62},
  logo: {fontSize: 42, fontWeight: '900', color: theme.primary, textAlign: 'center'},
  subtitle: {color: theme.textLight, fontSize: 15, textAlign: 'center', marginTop: 10},
  form: {marginTop: 44, gap: 16}, label: {fontSize: 15, color: theme.text, fontWeight: '600'},
  input: {backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1,
    borderRadius: 14, padding: 16, color: theme.text, minHeight: 54},
  error: {color: theme.error}, note: {textAlign: 'center', color: theme.textLight, fontSize: 12},
});

