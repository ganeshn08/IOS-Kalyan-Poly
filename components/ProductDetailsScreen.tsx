import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';
import { Screen } from './Screen';

type ProductDetailsScreenProps = {
  product: Product;
  quantity: number;
  onBack: () => void;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onViewCart: () => void;
};

export function ProductDetailsScreen({
  product,
  quantity,
  onBack,
  onIncrease,
  onDecrease,
  onViewCart,
}: ProductDetailsScreenProps) {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Product details</Text>
      </View>

      <View style={styles.imageArea}>
        <Image source={product.image} resizeMode="contain" accessibilityLabel={product.name} style={{ width: '100%', height: '100%', borderRadius: 24 }} />
      </View>

      <View style={styles.contentCard}>
        <View style={styles.statusRow}>
          <Text style={styles.stock}>IN STOCK</Text>
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        </View>
        <Text accessibilityRole="header" style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>by {product.brand}</Text>

        <View style={styles.specificationRow}>
          <View style={styles.specificationBox}>
            <Text style={styles.specificationValue}>{product.thicknessMm} mm</Text>
            <Text style={styles.specificationLabel}>THICKNESS</Text>
          </View>
          <View style={styles.specificationBox}>
            <Text style={styles.specificationValue}>{product.coilLengthM.toLocaleString('en-IN')} m</Text>
            <Text style={styles.specificationLabel}>COIL LENGTH</Text>
          </View>
        </View>

        <Text style={styles.descriptionTitle}>Product information</Text>
        <Text style={styles.description}>
          Designed for agricultural drip irrigation. Final availability and delivery details are confirmed by Kalyan Polymers after the order is placed.
        </Text>

        <View style={styles.purchaseRow}>
          <View>
            <Text style={styles.priceLabel}>PRODUCT PRICE</Text>
            <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          </View>

          {quantity === 0 ? (
            <Pressable onPress={() => onIncrease(product)} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
              <Text style={styles.addText}>ADD TO CART</Text>
            </Pressable>
          ) : (
            <View style={styles.quantityControl}>
              <Pressable onPress={() => onDecrease(product)} style={styles.quantityButton}>
                <Text style={styles.quantitySymbol}>−</Text>
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable onPress={() => onIncrease(product)} style={styles.quantityButton}>
                <Text style={styles.quantitySymbol}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {quantity > 0 && (
        <Pressable onPress={onViewCart} style={({ pressed }) => [styles.cartButton, pressed && styles.pressed]}>
          <Text style={styles.cartButtonText}>View cart</Text>
          <Text style={styles.cartArrow}>→</Text>
        </Pressable>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 20 },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, height: 46, justifyContent: 'center', width: 46 },
  backArrow: { color: colors.text, fontSize: 24 },
  headerTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
  imageArea: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 24, height: 260, justifyContent: 'center' },
  pipeOuter: { alignItems: 'center', backgroundColor: colors.hero, borderColor: colors.primary, borderRadius: 78, borderWidth: 14, height: 150, justifyContent: 'center', width: 150 },
  pipeInner: { backgroundColor: colors.primarySoft, borderRadius: 40, height: 78, width: 78 },
  brandMark: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 1.8, marginTop: 16 },
  contentCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, marginTop: 14, padding: 19 },
  statusRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  stock: { color: '#378044', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  category: { color: colors.primary, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  name: { color: colors.text, fontSize: 23, fontWeight: '900', letterSpacing: -0.5, lineHeight: 29, marginTop: 9 },
  brand: { color: colors.textMuted, fontSize: 12, marginTop: 5 },
  specificationRow: { flexDirection: 'row', gap: 10, marginTop: 21 },
  specificationBox: { backgroundColor: colors.background, borderRadius: 14, flex: 1, padding: 13 },
  specificationValue: { color: colors.text, fontSize: 15, fontWeight: '900' },
  specificationLabel: { color: colors.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.8, marginTop: 4 },
  descriptionTitle: { color: colors.text, fontSize: 14, fontWeight: '900', marginTop: 22 },
  description: { color: colors.textMuted, fontSize: 12, lineHeight: 19, marginTop: 7 },
  purchaseRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  priceLabel: { color: colors.textMuted, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  price: { color: colors.text, fontSize: 23, fontWeight: '900', marginTop: 2 },
  addButton: { backgroundColor: colors.accent, borderRadius: 13, paddingHorizontal: 18, paddingVertical: 14 },
  addText: { color: colors.onAccent, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  quantityControl: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 13, flexDirection: 'row' },
  quantityButton: { alignItems: 'center', height: 44, justifyContent: 'center', width: 42 },
  quantitySymbol: { color: colors.onAccent, fontSize: 20, fontWeight: '900' },
  quantity: { color: colors.onAccent, fontSize: 15, fontWeight: '900' },
  cartButton: { alignItems: 'center', backgroundColor: colors.hero, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 20, paddingVertical: 17 },
  cartButtonText: { color: colors.onHero, fontSize: 15, fontWeight: '800' },
  cartArrow: { color: colors.accent, fontSize: 22 },
  pressed: { opacity: 0.7 },
});
