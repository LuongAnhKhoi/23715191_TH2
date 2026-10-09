import { STUDENT,examStamp } from '@constants/student';
import { create } from 'zustand';
interface AuthState {token: string | null; login: () => void; logout: () => void;}
export const useAuthStore = create<AuthState>(set => ({
  token: null,
  login: () => set({token: 'ktxgo-' + STUDENT.mssv + '-' + examStamp()}),
  logout: () => set({token: null}),
}));

