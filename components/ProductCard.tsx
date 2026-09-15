import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';

type ProductCardProps = {
  product: Product;
  quantity: number;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onOpen: (product: Product) => void;
};

export function ProductCard({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onOpen,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityLabel={`View details for ${product.name}`}
        accessibilityRole="button"
        onPress={() => onOpen(product)}
        style={({ pressed }) => [styles.productImage, pressed && styles.buttonPressed]}
      >
        <Image source={product.image} resizeMode="contain" accessibilityLabel={product.name} style={{ width: '100%', height: '100%' }} />
      </Pressable>

      <View style={styles.details}>
        <Text style={styles.stock}>IN STOCK</Text>
        <Pressable onPress={() => onOpen(product)}>
          <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
        </Pressable>
        <Text style={styles.specification}>
          {product.thicknessMm} mm · {product.coilLengthM.toLocaleString('en-IN')} m coil
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          {quantity === 0 ? (
            <Pressable
              accessibilityLabel={`Add ${product.name} to cart`}
              accessibilityRole="button"
              onPress={() => onIncrease(product)}
              style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}
            >
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          ) : (
            <View style={styles.quantityControl}>
              <Pressable
                accessibilityLabel={`Remove one ${product.name}`}
                accessibilityRole="button"
                onPress={() => onDecrease(product)}
                style={({ pressed }) => [styles.quantityButton, pressed && styles.buttonPressed]}
              >
                <Text style={styles.quantitySymbol}>−</Text>
              </Pressable>
              <Text style={styles.quantity}>{quantity}</Text>
              <Pressable
                accessibilityLabel={`Add another ${product.name}`}
                accessibilityRole="button"
                onPress={() => onIncrease(product)}
                style={({ pressed }) => [styles.quantityButton, pressed && styles.buttonPressed]}
              >
                <Text style={styles.quantitySymbol}>+</Text>
              </Pressable>
            </View>
          )}
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
  buttonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: colors.onAccent,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  quantityControl: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    minWidth: 112,
  },
  quantityButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 38,
  },
  quantitySymbol: {
    color: colors.onAccent,
    fontSize: 20,
    fontWeight: '800',
  },
  quantity: {
    color: colors.onAccent,
    fontSize: 14,
    fontWeight: '900',
  },
});
