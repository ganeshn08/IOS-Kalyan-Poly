import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';
import type { CustomerDetails } from './CheckoutScreen';
import { Screen } from './Screen';

type ReviewOrderScreenProps = {
  customer: CustomerDetails;
  products: Product[];
  quantities: Record<string, number>;
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
};

export function ReviewOrderScreen({
  customer,
  products,
  quantities,
  total,
  onBack,
  onPlaceOrder,
}: ReviewOrderScreenProps) {
  const cartProducts = products.filter((product) => (quantities[product.id] ?? 0) > 0);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View>
          <Text accessibilityRole="header" style={styles.title}>Review order</Text>
          <Text style={styles.subtitle}>Check everything before placing it</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>DELIVER TO</Text>
      <View style={styles.card}>
        <Text style={styles.customerName}>{customer.name}</Text>
        <Text style={styles.detail}>+91 {customer.phone}</Text>
        <Text style={styles.address}>{customer.address}</Text>
        {customer.notes.trim() && <Text style={styles.notes}>Note: {customer.notes}</Text>}
      </View>

      <Text style={[styles.sectionLabel, styles.itemsLabel]}>ORDER ITEMS</Text>
      <View style={styles.card}>
        {cartProducts.map((product, index) => {
          const quantity = quantities[product.id] ?? 0;
          const lineTotal = product.price * quantity;

          return (
            <View key={product.id} style={[styles.item, index > 0 && styles.itemBorder]}>
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{quantity}×</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemSpec}>{product.coilLengthM.toLocaleString('en-IN')} m coil</Text>
              </View>
              <Text style={styles.itemTotal}>₹{lineTotal.toLocaleString('en-IN')}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.totalCard}>
        <View>
          <Text style={styles.totalLabel}>Amount payable</Text>
          <Text style={styles.deliveryNote}>Delivery charge confirmed by store</Text>
        </View>
        <Text style={styles.total}>₹{total.toLocaleString('en-IN')}</Text>
      </View>

      <Pressable
        onPress={onPlaceOrder}
        style={({ pressed }) => [styles.placeButton, pressed && styles.pressed]}
      >
        <Text style={styles.placeButtonText}>Place order</Text>
        <Text style={styles.placeArrow}>→</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 27 },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, height: 46, justifyContent: 'center', width: 46 },
  backArrow: { color: colors.text, fontSize: 24 },
  title: { color: colors.text, fontSize: 24, fontWeight: '900', letterSpacing: -0.7 },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  sectionLabel: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 8 },
  itemsLabel: { marginTop: 22 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, padding: 17 },
  customerName: { color: colors.text, fontSize: 16, fontWeight: '900' },
  detail: { color: colors.textMuted, fontSize: 12, marginTop: 5 },
  address: { color: colors.text, fontSize: 13, lineHeight: 19, marginTop: 10 },
  notes: { backgroundColor: colors.primarySoft, borderRadius: 10, color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 12, padding: 10 },
  item: { alignItems: 'center', flexDirection: 'row', paddingVertical: 5 },
  itemBorder: { borderColor: colors.border, borderTopWidth: 1, marginTop: 12, paddingTop: 17 },
  quantityBadge: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 10, height: 38, justifyContent: 'center', width: 38 },
  quantityText: { color: colors.onAccent, fontSize: 12, fontWeight: '900' },
  itemDetails: { flex: 1, marginHorizontal: 11 },
  itemName: { color: colors.text, fontSize: 12, fontWeight: '800' },
  itemSpec: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  itemTotal: { color: colors.text, fontSize: 13, fontWeight: '900' },
  totalCard: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 17, flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, padding: 17 },
  totalLabel: { color: colors.text, fontSize: 13, fontWeight: '800' },
  deliveryNote: { color: colors.textMuted, fontSize: 9, marginTop: 3 },
  total: { color: colors.text, fontSize: 21, fontWeight: '900' },
  placeButton: { alignItems: 'center', backgroundColor: colors.hero, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 20, paddingVertical: 17 },
  placeButtonText: { color: colors.onHero, fontSize: 15, fontWeight: '800' },
  placeArrow: { color: colors.accent, fontSize: 22 },
  pressed: { opacity: 0.7 },
});
