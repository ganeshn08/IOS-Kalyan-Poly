import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { Screen } from './Screen';

type OrderConfirmationScreenProps = {
  orderId: string;
  itemCount: number;
  total: number;
  onContinueShopping: () => void;
};

export function OrderConfirmationScreen({
  orderId,
  itemCount,
  total,
  onContinueShopping,
}: OrderConfirmationScreenProps) {
  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.successMark}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text accessibilityRole="header" style={styles.title}>Order received</Text>
        <Text style={styles.message}>
          Thank you. Kalyan Polymers will confirm availability and delivery details with you.
        </Text>

        <View style={styles.orderCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Order reference</Text>
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Items</Text>
            <Text style={styles.value}>{itemCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Product total</Text>
            <Text style={styles.total}>₹{total.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        <View style={styles.nextStep}>
          <Text style={styles.nextStepLabel}>WHAT HAPPENS NEXT?</Text>
          <Text style={styles.nextStepText}>
            The store will contact you to confirm stock, delivery charges, and payment.
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onContinueShopping}
        style={({ pressed }) => [styles.continueButton, pressed && styles.pressed]}
      >
        <Text style={styles.continueText}>Continue shopping</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingBottom: 24 },
  successMark: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 38, height: 76, justifyContent: 'center', width: 76 },
  check: { color: colors.onAccent, fontSize: 38, fontWeight: '900' },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', letterSpacing: -0.8, marginTop: 22 },
  message: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginTop: 9, maxWidth: 300, textAlign: 'center' },
  orderCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 19, borderWidth: 1, marginTop: 26, padding: 18, width: '100%' },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  label: { color: colors.textMuted, fontSize: 12 },
  value: { color: colors.text, fontSize: 13, fontWeight: '800' },
  orderId: { color: colors.primary, fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },
  total: { color: colors.text, fontSize: 18, fontWeight: '900' },
  divider: { backgroundColor: colors.border, height: 1, marginVertical: 10 },
  nextStep: { backgroundColor: colors.primarySoft, borderRadius: 16, marginTop: 14, padding: 16, width: '100%' },
  nextStepLabel: { color: colors.primary, fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  nextStepText: { color: colors.text, fontSize: 12, lineHeight: 18, marginTop: 7 },
  continueButton: { alignItems: 'center', backgroundColor: colors.hero, borderRadius: 16, paddingVertical: 17 },
  continueText: { color: colors.onHero, fontSize: 15, fontWeight: '800' },
  pressed: { opacity: 0.7 },
});
