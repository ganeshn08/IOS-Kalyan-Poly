import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.productImage}>
        <View style={styles.pipeOuter}>
          <View style={styles.pipeInner} />
        </View>
        <Text style={styles.imageLabel}>{product.brand.toUpperCase()}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.stock}>IN STOCK</Text>
        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>
        <Text style={styles.specification}>
          {product.thicknessMm} mm · {product.coilLengthM.toLocaleString('en-IN')} m coil
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          <Pressable
            accessibilityLabel={`Add ${product.name} to cart`}
            accessibilityRole="button"
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  productImage: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    height: 138,
    justifyContent: 'center',
  },
  pipeOuter: {
    alignItems: 'center',
    backgroundColor: colors.hero,
    borderColor: colors.primary,
    borderRadius: 52,
    borderWidth: 10,
    height: 94,
    justifyContent: 'center',
    width: 94,
  },
  pipeInner: {
    backgroundColor: colors.primarySoft,
    borderRadius: 25,
    height: 48,
    width: 48,
  },
  imageLabel: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginTop: 8,
  },
  details: {
    padding: 16,
  },
  stock: {
    color: '#378044',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: 5,
  },
  specification: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  price: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 78,
    paddingHorizontal: 18,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: colors.onAccent,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});
