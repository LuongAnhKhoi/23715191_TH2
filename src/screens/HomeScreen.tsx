import { ProductCard } from '@components/ProductCard';
import { Screen } from '@components/Screen';
import { BANNER_IMAGE_ID,DEBOUNCE_MS,ROOM_LABEL,STUDENT } from '@constants/student';
import { theme } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import type { ShopParamList } from '@navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Product } from '@services/productApi';
import { sampleProducts } from '@services/sampleProducts';
import { FlashList } from '@shopify/flash-list';
import React,{ useState } from 'react';
import { Image,StyleSheet,Text,TextInput,View } from 'react-native';
export function HomeScreen({navigation}: NativeStackScreenProps<ShopParamList, 'Home'>) {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search, DEBOUNCE_MS);
  const products = sampleProducts;
  
  const visible = products.filter(item => item.title.toLocaleLowerCase().includes(debounced.trim().toLocaleLowerCase()));
  return <Screen>
    <View style={styles.header}><Text style={styles.logo}>KTXGO</Text>
      <Text style={styles.delivery}>Giao tận {ROOM_LABEL}</Text></View>
    <View style={styles.searchWrap}><TextInput testID="search-input" accessibilityLabel="Tìm món"
      placeholder="Tìm món, đồ uống, đồ dùng…" placeholderTextColor={theme.textLight}
      value={search} onChangeText={setSearch} style={styles.search} /></View>
    
<FlashList<Product> testID="product-list" data={visible} numColumns={2} estimatedItemSize={252}
  keyExtractor={item => STUDENT.mssv + '-' + item.id} contentContainerStyle={styles.list}
  keyboardShouldPersistTaps="handled" 
  ListHeaderComponent={<Image source={{uri: 'https://picsum.photos/id/' + BANNER_IMAGE_ID + '/800/240'}}
    style={styles.banner} resizeMode="cover" accessibilityLabel="Giao tận phòng ký túc xá" />}
  ListEmptyComponent={<Text style={styles.empty}>Không có món phù hợp.</Text>}
  renderItem={({item}) => <ProductCard product={item}
    onOpen={() => navigation.navigate('Detail', {id: item.id})}  />} />

  </Screen>;
}
const styles = StyleSheet.create({
  header: {backgroundColor: theme.primary, paddingHorizontal: 20, paddingVertical: 16},
  logo: {fontSize: 25, fontWeight: '900', color: theme.surface},
  delivery: {color: '#DBEAFE', fontSize: 13, marginTop: 4},
  searchWrap: {paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8},
  search: {borderWidth: 1, borderColor: theme.border, borderRadius: 14,
    backgroundColor: theme.surface, color: theme.text, minHeight: 48, paddingHorizontal: 14},
  list: {paddingHorizontal: 10, paddingBottom: 16}, center: {flex: 1,
    alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14},
  message: {fontSize: 15, color: theme.text, textAlign: 'center'},
  error: {color: theme.error, fontWeight: '700', textAlign: 'center'},
  banner: {height: 88, width: '100%', borderRadius: 14, marginBottom: 8},
  empty: {color: theme.textLight, textAlign: 'center', padding: 24},
});

