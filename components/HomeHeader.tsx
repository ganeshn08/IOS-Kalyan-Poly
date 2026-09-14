import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function HomeHeader() {
  return (
    <View>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.brand}>Kalyan</Text>
          <Text style={styles.brandDetail}>POLYMERS</Text>
        </View>

        <View accessibilityLabel="Kalyan Polymers account" style={styles.profile}>
          <Text style={styles.profileText}>KP</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <View style={styles.locationMarker} />
        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>DELIVERING TO</Text>
          <Text numberOfLines={1} style={styles.locationValue}>
            Phulambri, Maharashtra
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -1,
  },
  brandDetail: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 2,
  },
  profile: {
    alignItems: 'center',
    backgroundColor: colors.hero,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  profileText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  locationRow: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  locationMarker: {
    backgroundColor: colors.accent,
    borderColor: colors.hero,
    borderRadius: 7,
    borderWidth: 4,
    height: 14,
    marginRight: 12,
    width: 14,
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  locationValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 3,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 27,
    lineHeight: 28,
    marginLeft: 8,
  },
});
