import { VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import { ShopStack } from '@navigation/ShopStack';
import type { TabsParamList } from '@navigation/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import React from 'react';
import { StyleSheet,Text } from 'react-native';
const Tabs = createBottomTabNavigator<TabsParamList>();
function ShopIcon({color}: {color: string}) {return <Text style={[styles.icon, {color}]}>▦</Text>;}
function CartIcon({color}: {color: string}) {return <Text style={[styles.icon, {color}]}>▤</Text>;}
function MeIcon({color}: {color: string}) {return <Text style={[styles.icon, {color}]}>●</Text>;}
export function MainTabs() {
  const quantity = useCartStore(state => state.items.reduce((sum, row) => sum + row.qty, 0));
  const shop = <Tabs.Screen key="Shop" name="Shop" component={ShopStack}
    options={{title: 'Cửa hàng', tabBarIcon: ShopIcon}} />;
  const cart = <Tabs.Screen key="Cart" name="Cart" component={CartScreen}
    options={{title: 'Giỏ', tabBarIcon: CartIcon, tabBarBadge: quantity || undefined}} />;
  return <Tabs.Navigator screenOptions={{headerShown: false,
    tabBarActiveTintColor: theme.primary, tabBarInactiveTintColor: theme.textLight,
    tabBarBadgeStyle: {backgroundColor: theme.secondary},
    tabBarStyle: {backgroundColor: theme.surface, borderTopColor: theme.border}}}>
    {VARIANT.tabOrder === 'cartFirst' ? [cart, shop] : [shop, cart]}
    <Tabs.Screen name="Me" component={MeScreen} options={{title: 'Tôi', tabBarIcon: MeIcon}} />
  </Tabs.Navigator>;
}
const styles = StyleSheet.create({icon: {fontSize: 23, fontWeight: '700'}});

