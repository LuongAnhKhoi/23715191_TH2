import { theme } from '@constants/theme';
import React from 'react';
import { Pressable,StyleSheet,Text } from 'react-native';
export function Action({label, onPress, disabled = false, danger = false, outline = false, testID}: {
  label: string; onPress: () => void; disabled?: boolean; danger?: boolean; outline?: boolean; testID?: string;
}) {
  return <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={label}
    accessibilityState={{disabled}} disabled={disabled} onPress={onPress}
    style={({pressed}) => [styles.button, danger && styles.danger, outline && styles.outline,
      (pressed || disabled) && styles.faded]}>
    <Text style={[styles.label, outline && styles.outlineLabel]}>{label}</Text>
  </Pressable>;
}
const styles = StyleSheet.create({
  button: {minHeight: 48, borderRadius: 14, backgroundColor: theme.primary,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 12},
  danger: {backgroundColor: theme.error}, outline: {backgroundColor: theme.surface,
    borderColor: theme.primary, borderWidth: 1}, faded: {opacity: 0.55},
  label: {color: theme.surface, fontSize: 15, fontWeight: '700'}, outlineLabel: {color: theme.primary},
});

