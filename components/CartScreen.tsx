import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';
import { Screen } from './Screen';

type CartScreenProps = {
  products: Product[];
  quantities: Record<string, number>;
  total: number;
  onBack: () => void;
  onCheckout: () => void;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
};

export function CartScreen({
  products,
  quantities,
  total,
  onBack,
  onCheckout,
  onIncrease,
  onDecrease,
}: CartScreenProps) {
  const cartProducts = products.filter((product) => (quantities[product.id] ?? 0) > 0);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back to shopping"
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View>
          <Text accessibilityRole="header" style={styles.title}>Your cart</Text>
          <Text style={styles.subtitle}>Review your selected products</Text>
        </View>
      </View>

      {cartProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptySymbol}>KP</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyMessage}>Add irrigation products to prepare your order.</Text>
          <Pressable onPress={onBack} style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Continue shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.items}>
            {cartProducts.map((product) => {
              const quantity = quantities[product.id] ?? 0;

              return (
                <View key={product.id} style={styles.item}>
                  <View style={styles.thumbnail}>
                    <View style={styles.pipe} />
                  </View>
                  <View style={styles.itemDetails}>
                    <Text numberOfLines={2} style={styles.itemName}>{product.name}</Text>
                    <Text style={styles.itemSpec}>{product.coilLengthM.toLocaleString('en-IN')} m coil</Text>
                    <Text style={styles.itemPrice}>₹{product.price.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.quantityControl}>
                    <Pressable onPress={() => onDecrease(product)} style={styles.quantityButton}>
                      <Text style={styles.quantitySymbol}>−</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Pressable onPress={() => onIncrease(product)} style={styles.quantityButton}>
                      <Text style={styles.quantitySymbol}>+</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Product total</Text>
              <Text style={styles.summaryValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.deliveryValue}>Calculated later</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Order total</Text>
              <Text style={styles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
          </View>

          <Pressable
            onPress={onCheckout}
            style={({ pressed }) => [styles.checkoutButton, pressed && styles.pressed]}
          >
            <Text style={styles.checkoutText}>Continue to checkout</Text>
            <Text style={styles.checkoutArrow}>→</Text>
          </Pressable>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 28 },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, height: 46, justifyContent: 'center', width: 46 },
  backArrow: { color: colors.text, fontSize: 24 },
  title: { color: colors.text, fontSize: 25, fontWeight: '900', letterSpacing: -0.7 },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  items: { gap: 10 },
  item: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flexDirection: 'row', padding: 12 },
  thumbnail: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 14, height: 72, justifyContent: 'center', width: 72 },
  pipe: { borderColor: colors.primary, borderRadius: 22, borderWidth: 8, height: 44, width: 44 },
  itemDetails: { flex: 1, marginHorizontal: 12 },
  itemName: { color: colors.text, fontSize: 13, fontWeight: '800', lineHeight: 17 },
  itemSpec: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  itemPrice: { color: colors.text, fontSize: 14, fontWeight: '900', marginTop: 7 },
  quantityControl: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 11, flexDirection: 'row' },
  quantityButton: { alignItems: 'center', height: 36, justifyContent: 'center', width: 32 },
  quantitySymbol: { color: colors.onAccent, fontSize: 18, fontWeight: '800' },
  quantity: { color: colors.onAccent, fontSize: 13, fontWeight: '900' },
  summary: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, marginTop: 20, padding: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  summaryLabel: { color: colors.textMuted, fontSize: 13 },
  summaryValue: { color: colors.text, fontSize: 13, fontWeight: '700' },
  deliveryValue: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  divider: { backgroundColor: colors.border, height: 1, marginVertical: 12 },
  totalLabel: { color: colors.text, fontSize: 16, fontWeight: '800' },
  totalValue: { color: colors.text, fontSize: 18, fontWeight: '900' },
  checkoutButton: { alignItems: 'center', backgroundColor: colors.hero, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 20, paddingVertical: 17 },
  checkoutText: { color: colors.onHero, fontSize: 15, fontWeight: '800' },
  checkoutArrow: { color: colors.accent, fontSize: 22 },
  emptyState: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, padding: 30 },
  emptySymbol: { backgroundColor: colors.accent, borderRadius: 18, color: colors.onAccent, fontSize: 16, fontWeight: '900', overflow: 'hidden', paddingHorizontal: 16, paddingVertical: 13 },
  emptyTitle: { color: colors.text, fontSize: 19, fontWeight: '900', marginTop: 18 },
  emptyMessage: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 6, textAlign: 'center' },
  shopButton: { backgroundColor: colors.primary, borderRadius: 13, marginTop: 20, paddingHorizontal: 20, paddingVertical: 13 },
  shopButtonText: { color: colors.onPrimary, fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.7 },
});
