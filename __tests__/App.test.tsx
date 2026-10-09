import {
BANNER_IMAGE_ID,
BASE_SHIP_FEE,
DEBOUNCE_MS,
LAST_DIGIT,
PRICE_MULTIPLIER,
ROOM_LABEL,
STALE_TIME_MS,
STUDENT,
STUDENT_SEED,
VARIANT,examStamp,productAmount
} from '@constants/student';
import { useAuthStore } from '@stores/authStore';
test('identity constants match the supplied student and exam formulas', () => {
  expect(STUDENT).toEqual({mssv: '23715191', hoTen: 'LUONG ANH KHOI'});
  expect([LAST_DIGIT, STUDENT_SEED, DEBOUNCE_MS, STALE_TIME_MS, PRICE_MULTIPLIER, BASE_SHIP_FEE, ROOM_LABEL, BANNER_IMAGE_ID])
    .toEqual([1, 191, 400, 21000, 30500, 9000, 'P.291', 241]);
  expect(VARIANT).toEqual({watermarkAtTop: false, authField: 'phone', tabOrder: 'shopFirst',
    hapticOnAdd: 'selection', shipFormula: 'B', detailPresentation: 'card'});
  expect(examStamp()).toBe('353533');
  expect(productAmount(0.1234)).toBe(3764);
});
test('login token and logout are consistent with student identity', () => {
  useAuthStore.getState().login();
  expect(useAuthStore.getState().token).toBe('ktxgo-23715191-' + examStamp());
  useAuthStore.getState().logout();
  expect(useAuthStore.getState().token).toBeNull();
});

