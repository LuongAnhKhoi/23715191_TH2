import { Screen } from '@components/Screen';
import { formatMoney,productAmount,ROOM_LABEL,STUDENT,VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import { useCampusLocationStore } from '@hooks/useCampusLocation';
import { useCartStore } from '@stores/cartStore';
import React from 'react';
import { FlatList,Pressable,StyleSheet,Text,View } from 'react-native';
export function CartScreen() {
  const items = useCartStore(state => state.items);
  const changeQty = useCartStore(state => state.changeQty);
  const remove = useCartStore(state => state.removeItem);
  const amount = items.reduce((sum, row) => sum + productAmount(row.product.price) * row.qty, 0);
  const fee = useCampusLocationStore(state => state.fee);
  return <Screen><View style={styles.header}><Text style={styles.headerText}>GIỎ HÀNG</Text></View>
    <FlatList data={items} keyExtractor={item => STUDENT.mssv + '-' + item.product.id} contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.text}>Giỏ hàng đang trống.</Text>
        <Text style={styles.muted}>Thêm món từ Cửa hàng để bắt đầu.</Text></View>}
      renderItem={({item}) => <View style={styles.card}>
        <View style={styles.row}><Text numberOfLines={2} style={styles.name}>{item.product.title}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={'Xóa ' + item.product.title}
            onPress={() => remove(item.product.id)} style={styles.delete}><Text style={styles.deleteText}>Xóa</Text></Pressable></View>
        <View style={styles.row}>
          <View style={styles.quantity}>
            <Pressable accessibilityRole="button" accessibilityLabel={'Giảm số lượng ' + item.product.title}
              onPress={() => changeQty(item.product.id, item.qty - 1)} style={styles.adjust}><Text style={styles.adjustText}>−</Text></Pressable>
            <Text style={styles.qty}>{item.qty}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel={'Tăng số lượng ' + item.product.title}
              onPress={() => changeQty(item.product.id, item.qty + 1)} style={styles.adjust}><Text style={styles.adjustText}>+</Text></Pressable>
          </View><Text style={styles.price}>{formatMoney(productAmount(item.product.price) * item.qty)}</Text>
        </View>
      </View>}
      ListFooterComponent={<View style={styles.summary}>
        <Text style={styles.text}>Giao đến {ROOM_LABEL}</Text>
        
{fee !== null ? <Text style={styles.ship}>Phí ship: {formatMoney(fee)} (công thức {VARIANT.shipFormula})</Text>
  : <Text style={styles.muted}>Chưa ước tính phí — mở tab Tôi</Text>}

        <Text style={styles.total}>Tổng hàng: {formatMoney(amount)}</Text>
        {fee !== null && items.length > 0 && <Text style={styles.total}>Dự kiến: {formatMoney(amount + fee)}</Text>}
      </View>} />
  </Screen>;
}
const styles = StyleSheet.create({
  header: {padding: 18, backgroundColor: theme.primary}, headerText: {color: theme.surface,
    fontSize: 18, fontWeight: '800', textAlign: 'center'}, list: {padding: 16, gap: 12},
  card: {padding: 14, backgroundColor: theme.surface, borderRadius: 16, gap: 12,
    borderWidth: 1, borderColor: theme.border}, row: {flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', gap: 8, flexWrap: 'wrap'}, name: {flex: 1, color: theme.text, fontWeight: '600'},
  delete: {minWidth: 44, minHeight: 44, borderRadius: 12, backgroundColor: theme.error,
    alignItems: 'center', justifyContent: 'center'}, deleteText: {color: theme.surface, fontSize: 12, fontWeight: '700'},
  quantity: {flexDirection: 'row', alignItems: 'center', gap: 8}, qty: {color: theme.text, minWidth: 24, textAlign: 'center'},
  adjust: {height: 44, width: 44, backgroundColor: theme.background, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center'}, adjustText: {color: theme.primary, fontSize: 22},
  price: {color: theme.primary, fontWeight: '700'}, summary: {padding: 16, borderColor: theme.secondary,
    borderWidth: 1, borderRadius: 16, gap: 10, backgroundColor: theme.surface}, text: {color: theme.text},
  muted: {color: theme.textLight, fontSize: 12}, ship: {color: theme.secondary, fontWeight: '700'},
  total: {color: theme.primary, fontWeight: '800', fontSize: 17}, empty: {alignItems: 'center', gap: 10, padding: 24},
});

