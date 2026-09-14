import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <View style={styles.searchHandle} />
      </View>
      <TextInput
        accessibilityLabel="Search products"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        onChangeText={onChangeText}
        placeholder="Search pipes, drip lines, fittings"
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 14,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  searchIcon: {
    borderColor: colors.primary,
    borderRadius: 7,
    borderWidth: 2,
    height: 14,
    marginRight: 14,
    position: 'relative',
    width: 14,
  },
  searchHandle: {
    backgroundColor: colors.primary,
    borderRadius: 1,
    bottom: -5,
    height: 7,
    position: 'absolute',
    right: -4,
    transform: [{ rotate: '-45deg' }],
    width: 2,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
  },
});
