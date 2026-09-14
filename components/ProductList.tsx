import { StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/products';
import { colors } from '../theme';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Product[];
  quantities: Record<string, number>;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
  onOpen: (product: Product) => void;
};

export function ProductList({
  products,
  quantities,
  onIncrease,
  onDecrease,
  onOpen,
}: ProductListProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <Text accessibilityRole="header" style={styles.heading}>
          Popular products
        </Text>
        <Text style={styles.count}>{products.length} products</Text>
      </View>

      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onOpen={onOpen}
            product={product}
            quantity={quantities[product.id] ?? 0}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptyMessage}>
            Try another category or change your search.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    paddingBottom: 24,
  },
  headingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  heading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  count: {
    color: colors.textMuted,
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  emptyMessage: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});
