import { Action } from '@components/Action';
import { Screen } from '@components/Screen';
import { formatMoney,productAmount,ROOM_LABEL } from '@constants/student';
import { theme } from '@constants/theme';
import type { ShopParamList } from '@navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { sampleProducts } from '@services/sampleProducts';
import React,{ useState } from 'react';
import { Image,ScrollView,StyleSheet,Text,View } from 'react-native';
export function DetailScreen({route}: NativeStackScreenProps<ShopParamList, 'Detail'>) {
  const [imageFailed, setImageFailed] = useState(false);
  const product = sampleProducts.find(item => item.id === route.params.id);
  
  
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
    <Action label="Thêm vào giỏ" disabled onPress={() => {}} />
  </ScrollView></Screen>;
}
const styles = StyleSheet.create({
  content: {padding: 20, gap: 18}, center: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12},
  image: {height: 230, width: '100%', borderRadius: 18, backgroundColor: theme.surface},
  title: {fontSize: 22, fontWeight: '700', color: theme.text, textAlign: 'center'},
  price: {fontSize: 24, fontWeight: '800', color: theme.primary, textAlign: 'center'},
  room: {color: theme.textLight, textAlign: 'center'}, description: {color: theme.textLight, lineHeight: 23},
});

