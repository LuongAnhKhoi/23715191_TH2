import { formatMoney,productAmount } from '@constants/student';
import { theme } from '@constants/theme';
import type { Product } from '@services/productApi';
import React,{ useState } from 'react';
import { Image,Pressable,StyleSheet,Text,View } from 'react-native';
export function ProductCard({product, onOpen, onAdd}: {
  product: Product; onOpen: () => void; onAdd?: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return <View style={styles.outer}><View style={styles.card}>
    <Pressable testID={'open-' + product.id} accessibilityRole="button"
      accessibilityLabel={'Xem ' + product.title} onPress={onOpen} style={styles.open} />
    <View pointerEvents="none">
      {imageFailed ? <View style={[styles.image, styles.fallback]}><Text style={styles.muted}>KTXGO</Text></View>
        : <Image source={{uri: product.image}} resizeMode="contain" style={styles.image}
          onError={() => setImageFailed(true)} accessibilityLabel={product.title} />}
      <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
    </View>
    <View style={styles.footer} pointerEvents="box-none">
      <View pointerEvents="none" style={styles.priceArea}>
        <Text style={styles.price}>{formatMoney(productAmount(product.price))}</Text>
      </View>
      <Pressable testID={'add-' + product.id} accessibilityRole="button"
        accessibilityLabel={'Thêm ' + product.title + ' vào giỏ'}
        accessibilityState={{disabled: !onAdd}} disabled={!onAdd} onPress={onAdd}
        style={({pressed}) => [styles.add, (!onAdd || pressed) && styles.faded]}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
    </View>
  </View></View>;
}
const styles = StyleSheet.create({
  outer: {flex: 1, padding: 6}, card: {padding: 10, borderRadius: 18,
    backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border},
  open: StyleSheet.absoluteFillObject,
  image: {height: 116, width: '100%', borderRadius: 10, backgroundColor: theme.surface},
  fallback: {alignItems: 'center', justifyContent: 'center'}, muted: {color: theme.textLight},
  title: {fontSize: 13, lineHeight: 19, fontWeight: '600', color: theme.text, minHeight: 38, marginTop: 10},
  footer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 4, marginTop: 8}, priceArea: {flexShrink: 1},
  price: {fontSize: 12, fontWeight: '700', color: theme.primary},
  add: {width: 44, height: 44, backgroundColor: theme.primary, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center'}, faded: {opacity: 0.55},
  plus: {fontSize: 24, color: theme.surface, fontWeight: '600'},
});

