jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('react-native-haptic-feedback', () => ({trigger: jest.fn()}));
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hapticOnAdd } from '@services/haptic';
import type { Product } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { trigger } from 'react-native-haptic-feedback';
const product: Product = {id:'1',title:'Món',price:1,image:'',description:''};
beforeEach(() => {useCartStore.setState({items:[]}); jest.clearAllMocks();});
test('two add callers share quantity, totals, removal and zero-quantity semantics', () => {
  useCartStore.getState().addItem(product);
  useCartStore.getState().addItem({...product});
  expect(useCartStore.getState().items).toHaveLength(1);
  expect(useCartStore.getState().totalQuantity()).toBe(2);
  expect(useCartStore.getState().totalAmount()).toBe(61000);
  useCartStore.getState().changeQty('1',3);
  expect(useCartStore.getState().totalAmount()).toBe(91500);
  useCartStore.getState().changeQty('1',Number.NaN);
  expect(useCartStore.getState().totalQuantity()).toBe(3);
  useCartStore.getState().changeQty('1',0);
  expect(useCartStore.getState().items).toHaveLength(0);
  useCartStore.getState().addItem(product);
  useCartStore.getState().removeItem('1');
  expect(useCartStore.getState().totalAmount()).toBe(0);
});
test('persist uses student key and rehydrates a saved cart', async () => {
  useCartStore.getState().addItem(product);
  await Promise.resolve();
  const data = await AsyncStorage.getItem('ktxgo-cart-23715191');
  expect(data).not.toBeNull();
  useCartStore.setState({items:[]});
  await AsyncStorage.setItem('ktxgo-cart-23715191', data!);
  await useCartStore.persist.rehydrate();
  expect(useCartStore.getState().totalQuantity()).toBe(1);
});
test('student variant emits selection haptic', () => {
  hapticOnAdd();
  expect(trigger).toHaveBeenCalledWith('selection',expect.objectContaining({ignoreAndroidSystemSettings:false}));
});

