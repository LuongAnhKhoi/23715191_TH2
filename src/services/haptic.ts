import { VARIANT } from '@constants/student';
import { trigger } from 'react-native-haptic-feedback';
export function hapticOnAdd() {
  trigger(VARIANT.hapticOnAdd === 'impact' ? 'impactLight' : 'selection',
    {enableVibrateFallback: true, ignoreAndroidSystemSettings: false});
}

