import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export type CategoryId = 'all' | 'drip' | 'pipes' | 'fittings';

type CategoryListProps = {
  selected: CategoryId;
  onSelect: (category: CategoryId) => void;
};

const categories: { id: CategoryId; name: string; shortName: string }[] = [
  { id: 'all', name: 'All products', shortName: 'ALL' },
  { id: 'drip', name: 'Drip irrigation', shortName: 'DRIP' },
  { id: 'pipes', name: 'Pipes', shortName: 'PIPE' },
  { id: 'fittings', name: 'Fittings', shortName: 'FIT' },
];

export function CategoryList({ selected, onSelect }: CategoryListProps) {
  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <Text accessibilityRole="header" style={styles.heading}>
          Shop by category
        </Text>
        <Text style={styles.helper}>Find what you need</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const active = selected === category.id;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              key={category.id}
              onPress={() => onSelect(category.id)}
              style={({ pressed }) => [
                styles.category,
                active && styles.categoryActive,
                pressed && styles.categoryPressed,
              ]}
            >
              <View style={[styles.symbol, active && styles.symbolActive]}>
                <Text style={[styles.symbolText, active && styles.symbolTextActive]}>
                  {category.shortName}
                </Text>
              </View>
              <Text style={[styles.name, active && styles.nameActive]}>
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
  },
  headingRow: {
    alignItems: 'flex-end',
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
  helper: {
    color: colors.textMuted,
    fontSize: 11,
  },
  list: {
    gap: 10,
    paddingRight: 24,
  },
  category: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 116,
    padding: 12,
    width: 104,
  },
  categoryActive: {
    backgroundColor: colors.hero,
    borderColor: colors.hero,
  },
  categoryPressed: {
    opacity: 0.75,
  },
  symbol: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
  },
  symbolActive: {
    backgroundColor: colors.accent,
  },
  symbolText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  symbolTextActive: {
    color: colors.onAccent,
  },
  name: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    marginTop: 10,
  },
  nameActive: {
    color: colors.onHero,
  },
});
