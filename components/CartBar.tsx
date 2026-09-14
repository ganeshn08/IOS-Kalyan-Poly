import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type CartBarProps = {
  itemCount: number;
  total: number;
  onPress: () => void;
};

export function CartBar({ itemCount, total, onPress }: CartBarProps) {
  if (itemCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.count}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} added
        </Text>
        <Text style={styles.total}>₹{total.toLocaleString('en-IN')}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>View cart</Text>
        <Text style={styles.arrow}>→</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.hero,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  count: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  total: {
    color: colors.onHero,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.onHero,
    fontSize: 14,
    fontWeight: '800',
  },
  arrow: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '700',
  },
});
