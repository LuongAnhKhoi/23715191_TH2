import Geolocation from '@react-native-community/geolocation';
import { CAMPUS_GATE,haversineKm,shippingFee } from '@services/locationMath';
import { useCallback,useEffect,useState } from 'react';
import { AppState,Linking,PermissionsAndroid,Platform } from 'react-native';
import { create } from 'zustand';
export type LocationPermission = 'unknown' | 'granted' | 'denied' | 'blocked';
interface CampusState {permission: LocationPermission; km: number | null; fee: number | null;
  error: string | null; loading: boolean;}
export const useCampusLocationStore = create<CampusState>(() => ({
  permission: 'unknown', km: null, fee: null, error: null, loading: false,
}));
Geolocation.setRNConfiguration({skipPermissionRequests: true, locationProvider: 'android'});
function clearPosition(permission: LocationPermission) {
  useCampusLocationStore.setState({permission, km: null, fee: null});
}
export function useCampusLocation() {
  const state = useCampusLocationStore();
  const [openingSettings, setOpeningSettings] = useState(false);
  const requestLocation = useCallback(async () => {
    if (useCampusLocationStore.getState().loading) return;
    useCampusLocationStore.setState({loading: true, error: null, km: null, fee: null});
    try {
      if (Platform.OS === 'android') {
        const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        const coarse = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
        let granted = await PermissionsAndroid.check(fine) || await PermissionsAndroid.check(coarse);
        if (!granted) {
          const results = await PermissionsAndroid.requestMultiple([fine, coarse]);
          granted = results[fine] === PermissionsAndroid.RESULTS.GRANTED || results[coarse] === PermissionsAndroid.RESULTS.GRANTED;
          if (!granted) {
            clearPosition(results[fine] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
              results[coarse] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? 'blocked' : 'denied');
            return;
          }
        }
      } else {
        // This exercise is Android-first; authorization is requested explicitly on iOS too.
        await new Promise<void>((resolve, reject) => Geolocation.requestAuthorization(resolve, reject));
      }
      useCampusLocationStore.setState({permission: 'granted'});
      await new Promise<void>((resolve, reject) => Geolocation.getCurrentPosition(position => {
        const km = haversineKm(position.coords, CAMPUS_GATE);
        useCampusLocationStore.setState({km, fee: shippingFee(km)});
        resolve();
      }, reject, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}));
    } catch (error) {
      const detail = error as {code?: number; message?: string};
      if (detail.code === 1) clearPosition('denied');
      useCampusLocationStore.setState({km: null, fee: null,
        error: detail.code === 3 ? 'Chưa lấy được vị trí. Bật GPS rồi thử lại.'
          : detail.message || 'Không lấy được vị trí. Hãy thử lại.'});
    } finally {
      useCampusLocationStore.setState({loading: false});
    }
  }, []);
  const openSettings = useCallback(async () => {
    try {setOpeningSettings(true); await Linking.openSettings();}
    catch {setOpeningSettings(false); useCampusLocationStore.setState({error: 'Không mở được Cài đặt.'});}
  }, []);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async next => {
      if (next !== 'active' || Platform.OS !== 'android') return;
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) ||
        await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      if (!granted) {
        const previous = useCampusLocationStore.getState().permission;
        clearPosition(previous === 'blocked' ? 'blocked' : 'denied');
      } else if (openingSettings) {setOpeningSettings(false); void requestLocation();}
    });
    return () => subscription.remove();
  }, [openingSettings, requestLocation]);
  return {...state, requestLocation, openSettings};
}

