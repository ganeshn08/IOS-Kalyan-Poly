import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function HeroBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.glow} />
      <View style={styles.fieldLineOne} />
      <View style={styles.fieldLineTwo} />
      <View style={styles.fieldLineThree} />

      <View style={styles.content}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>READY FOR THE SEASON</Text>
        </View>

        <Text accessibilityRole="header" style={styles.title}>
          Smarter irrigation{`\n`}starts here.
        </Text>
        <Text style={styles.description}>
          Trusted supplies for stronger fields and dependable harvests.
        </Text>

        <View style={styles.promise}>
          <Text style={styles.promiseText}>Quality products</Text>
          <View style={styles.promiseDivider} />
          <Text style={styles.promiseText}>Local support</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.hero,
    borderRadius: 24,
    marginTop: 22,
    minHeight: 248,
    overflow: 'hidden',
    padding: 24,
  },
  content: {
    maxWidth: '82%',
    zIndex: 2,
  },
  eyebrowRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  eyebrowDot: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    height: 8,
    marginRight: 9,
    width: 8,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: colors.onHero,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 37,
    marginTop: 20,
  },
  description: {
    color: '#C7D0DF',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  promise: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  promiseText: {
    color: colors.onHero,
    fontSize: 11,
    fontWeight: '600',
  },
  promiseDivider: {
    backgroundColor: '#64738A',
    height: 12,
    marginHorizontal: 10,
    width: 1,
  },
  glow: {
    backgroundColor: colors.accent,
    borderRadius: 58,
    height: 116,
    opacity: 0.95,
    position: 'absolute',
    right: -34,
    top: -35,
    width: 116,
  },
  fieldLineOne: {
    borderColor: '#FFFFFF',
    borderRadius: 120,
    borderWidth: 1,
    bottom: -78,
    height: 180,
    opacity: 0.14,
    position: 'absolute',
    right: -54,
    transform: [{ rotate: '-18deg' }],
    width: 180,
  },
  fieldLineTwo: {
    borderColor: '#FFFFFF',
    borderRadius: 95,
    borderWidth: 1,
    bottom: -55,
    height: 135,
    opacity: 0.14,
    position: 'absolute',
    right: -28,
    transform: [{ rotate: '-18deg' }],
    width: 135,
  },
  fieldLineThree: {
    borderColor: '#FFFFFF',
    borderRadius: 70,
    borderWidth: 1,
    bottom: -35,
    height: 92,
    opacity: 0.14,
    position: 'absolute',
    right: -2,
    transform: [{ rotate: '-18deg' }],
    width: 92,
  },
});
