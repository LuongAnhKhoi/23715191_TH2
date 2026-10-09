import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { formatMoney,productAmount,ROOM_LABEL,STUDENT } from '@constants/student';
import { theme } from '@constants/theme';
import type { ShopParamList } from '@navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{ useState } from 'react';
import { ActivityIndicator,Alert,Image,ScrollView,StyleSheet,Text,View } from 'react-native';

import { networkMessage } from '@services/apiClient';
import { useProductsQuery } from '@hooks/useProductsQuery';

import { hapticOnAdd } from '@services/haptic';
import { useCartStore } from '@stores/cartStore';

export function DetailScreen({route}: NativeStackScreenProps<ShopParamList, 'Detail'>) {
  const [imageFailed, setImageFailed] = useState(false);
  
const query = useProductsQuery();
const product = query.data?.find(item => item.id === route.params.id);

  const add = useCartStore(state => state.addItem);
  
if (query.isPending) return <Screen detail><View style={styles.center}>
  <ActivityIndicator size="large" color={theme.primary} /><Text style={styles.description}>Đang tải món…</Text>
</View></Screen>;
if (query.isError) return <Screen detail><View style={styles.center}>
  <Text style={styles.description}>{STUDENT.mssv} · {networkMessage(query.error)}</Text>
  <Action label="Thử lại" onPress={() => {void query.refetch();}} disabled={query.isFetching} />
</View></Screen>;

  if (!product) return <Screen detail><View style={styles.center}>
    <Text style={styles.description}>Không tìm thấy món #{route.params.id}.</Text>
  </View></Screen>;
  return <Screen detail><ScrollView contentContainerStyle={styles.content}>
    {imageFailed ? <View style={[styles.image, styles.center]}><Text style={styles.description}>KTXGO</Text></View>
      : <Image source={{uri: product.image}} resizeMode="contain" style={styles.image} onError={() => setImageFailed(true)} />}
    <Text style={styles.title}>{product.title}</Text>
    <Text style={styles.price}>{formatMoney(productAmount(product.price))}</Text>
    <Text style={styles.room}>Giao tận {ROOM_LABEL}</Text>
    <Text numberOfLines={3} style={styles.description}>{product.description}</Text>
    <Action label="Thêm vào giỏ" 
onPress={() => {add(product); hapticOnAdd(); Alert.alert('Đã thêm vào giỏ', STUDENT.mssv + ' · ' + product.title);}}
 />
  </ScrollView></Screen>;
}
const styles = StyleSheet.create({
  content: {padding: 20, gap: 18}, center: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12},
  image: {height: 230, width: '100%', borderRadius: 18, backgroundColor: theme.surface},
  title: {fontSize: 22, fontWeight: '700', color: theme.text, textAlign: 'center'},
  price: {fontSize: 24, fontWeight: '800', color: theme.primary, textAlign: 'center'},
  room: {color: theme.textLight, textAlign: 'center'}, description: {color: theme.textLight, lineHeight: 23},
});

