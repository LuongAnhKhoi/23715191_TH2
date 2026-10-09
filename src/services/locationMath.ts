import { BASE_SHIP_FEE,VARIANT } from '@constants/student';
export interface Coordinate {latitude: number; longitude: number;}
// Classroom reference coordinate: the exam does not specify the actual gate. Update here if supplied.
export const CAMPUS_GATE: Coordinate = {latitude: 10.8221, longitude: 106.6879};
export function haversineKm(from: Coordinate, to: Coordinate): number {
  const rad = (degrees: number) => degrees * Math.PI / 180;
  const dLat = rad(to.latitude - from.latitude), dLon = rad(to.longitude - from.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.latitude)) *
    Math.cos(rad(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(Math.max(0, Math.min(1, a))), Math.sqrt(Math.max(0, 1 - a)));
}
export function shippingFee(km: number): number {
  return VARIANT.shipFormula === 'A' ? BASE_SHIP_FEE + Math.round(km * 2000)
    : BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
}
