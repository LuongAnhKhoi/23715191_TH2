export const STUDENT = {mssv: '23715191', hoTen: 'LUONG ANH KHOI'} as const;
export const LAST_DIGIT = Number(STUDENT.mssv.slice(-1));
export const STUDENT_SEED = parseInt(STUDENT.mssv.slice(-3), 10) || 1;
export const DEBOUNCE_MS = 300 + (STUDENT_SEED % 5) * 100;
export const STALE_TIME_MS = 10_000 + (STUDENT_SEED % 20) * 1000;
export const PRICE_MULTIPLIER = 15000 + (STUDENT_SEED % 40) * 500;
export const BASE_SHIP_FEE = 8000 + (STUDENT_SEED % 10) * 1000;
export const ROOM_LABEL = 'P.' + (100 + (STUDENT_SEED % 400));
export const BANNER_IMAGE_ID = 200 + (STUDENT_SEED % 150);
export const VARIANT = {
  watermarkAtTop: LAST_DIGIT % 2 === 0,
  authField: LAST_DIGIT % 2 === 0 ? 'email' : 'phone',
  tabOrder: LAST_DIGIT >= 5 ? 'cartFirst' : 'shopFirst',
  hapticOnAdd: LAST_DIGIT % 3 === 0 ? 'impact' : 'selection',
  shipFormula: LAST_DIGIT % 2 === 0 ? 'A' : 'B',
  detailPresentation: LAST_DIGIT >= 5 ? 'modal' : 'card',
} as const;
export function examStamp(): string {
  const raw = 'TH2|' + STUDENT.mssv + '|' + STUDENT.hoTen;
  let h = 5381;
  for (let i = 0; i < raw.length; i++) h = Math.imul(h, 33) ^ raw.charCodeAt(i);
  return String(Math.abs(h) % 1000000).padStart(6, '0');
}
export function productAmount(price: number): number {
  return Math.round(price * PRICE_MULTIPLIER);
}
export function formatMoney(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}

