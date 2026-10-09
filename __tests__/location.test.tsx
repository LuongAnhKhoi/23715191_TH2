jest.mock('@react-native-community/geolocation', () => ({
  setRNConfiguration: jest.fn(), getCurrentPosition: jest.fn(), requestAuthorization: jest.fn(),
}));
import { useCampusLocation,useCampusLocationStore } from '@hooks/useCampusLocation';
import Geolocation from '@react-native-community/geolocation';
import { CAMPUS_GATE,haversineKm,shippingFee } from '@services/locationMath';
import React from 'react';
import { Linking,PermissionsAndroid,Platform } from 'react-native';
import { act,create,type ReactTestRenderer } from 'react-test-renderer';
let api: ReturnType<typeof useCampusLocation>;
let tree: ReactTestRenderer;
function Probe() {api = useCampusLocation(); return null;}
beforeEach(() => {
  jest.replaceProperty(Platform, 'OS', 'android');
  useCampusLocationStore.setState({permission:'unknown',km:null,fee:null,error:null,loading:false});
  jest.spyOn(PermissionsAndroid,'check').mockResolvedValue(false);
  act(() => {tree = create(<Probe />);});
});
afterEach(() => {act(() => {tree.unmount();}); jest.restoreAllMocks();});
test('Haversine and formula B match independent known distances and fees', () => {
  expect(haversineKm(CAMPUS_GATE,CAMPUS_GATE)).toBe(0);
  expect(haversineKm({latitude:0,longitude:0},{latitude:0,longitude:1})).toBeCloseTo(111.1949,3);
  expect(shippingFee(0)).toBe(11000);
  expect(shippingFee(1.2)).toBe(12800);
});
test('denied permission clears old position and does not call GPS', async () => {
  jest.spyOn(PermissionsAndroid,'requestMultiple').mockResolvedValue({
    'android.permission.ACCESS_FINE_LOCATION':'denied', 'android.permission.ACCESS_COARSE_LOCATION':'denied',
  } as Awaited<ReturnType<typeof PermissionsAndroid.requestMultiple>>);
  const gps = jest.mocked(Geolocation.getCurrentPosition); gps.mockClear();
  await act(async () => {await api.requestLocation();});
  expect(api.permission).toBe('denied');expect(api.fee).toBeNull();expect(gps).not.toHaveBeenCalled();
});
test('blocked permission exposes the Settings action', async () => {
  jest.spyOn(PermissionsAndroid,'requestMultiple').mockResolvedValue({
    'android.permission.ACCESS_FINE_LOCATION':'never_ask_again', 'android.permission.ACCESS_COARSE_LOCATION':'never_ask_again',
  } as Awaited<ReturnType<typeof PermissionsAndroid.requestMultiple>>);
  const settings = jest.spyOn(Linking,'openSettings').mockResolvedValue();
  await act(async () => {await api.requestLocation();});
  expect(api.permission).toBe('blocked');
  await act(async () => {await api.openSettings();});
  expect(settings).toHaveBeenCalledTimes(1);
});
test('approximate permission is enough and publishes the fee shared by Cart', async () => {
  jest.spyOn(PermissionsAndroid,'requestMultiple').mockResolvedValue({
    'android.permission.ACCESS_FINE_LOCATION':'denied', 'android.permission.ACCESS_COARSE_LOCATION':'granted',
  } as Awaited<ReturnType<typeof PermissionsAndroid.requestMultiple>>);
  jest.mocked(Geolocation.getCurrentPosition).mockImplementation(success => success({
    coords:{...CAMPUS_GATE,altitude:null,accuracy:10,altitudeAccuracy:null,heading:null,speed:null},timestamp:Date.now(),
  }));
  await act(async () => {await api.requestLocation();});
  expect(api.permission).toBe('granted');expect(api.km).toBe(0);
  expect(useCampusLocationStore.getState().fee).toBe(11000);expect(api.loading).toBe(false);
});

