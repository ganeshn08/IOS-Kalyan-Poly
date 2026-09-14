import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';
import { Screen } from './Screen';

type CheckoutScreenProps = {
  itemCount: number;
  total: number;
  onBack: () => void;
  onReview: (details: CustomerDetails) => void;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

export function CheckoutScreen({ itemCount, total, onBack, onReview }: CheckoutScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const canContinue =
    name.trim().length > 1 && phone.trim().length >= 10 && address.trim().length > 5;

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back to cart"
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View>
          <Text accessibilityRole="header" style={styles.title}>Delivery details</Text>
          <Text style={styles.subtitle}>Where should we deliver your order?</Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionLabel}>CONTACT</Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          autoCapitalize="words"
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={name}
        />

        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={setPhone}
            placeholder="10-digit mobile number"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, styles.phoneInput]}
            value={phone}
          />
        </View>

        <Text style={[styles.sectionLabel, styles.addressSection]}>DELIVERY ADDRESS</Text>

        <Text style={styles.label}>Complete address</Text>
        <TextInput
          multiline
          onChangeText={setAddress}
          placeholder="House, street, village, taluka and PIN code"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.addressInput]}
          textAlignVertical="top"
          value={address}
        />

        <Text style={styles.label}>Order notes (optional)</Text>
        <TextInput
          multiline
          onChangeText={setNotes}
          placeholder="Add delivery instructions or product requirements"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.notesInput]}
          textAlignVertical="top"
          value={notes}
        />
      </View>

      <View style={styles.orderSummary}>
        <View>
          <Text style={styles.summaryLabel}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
          <Text style={styles.summaryHint}>Delivery charge confirmed by store</Text>
        </View>
        <Text style={styles.summaryTotal}>₹{total.toLocaleString('en-IN')}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!canContinue}
        onPress={() => onReview({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          notes: notes.trim(),
        })}
        style={({ pressed }) => [
          styles.continueButton,
          !canContinue && styles.continueButtonDisabled,
          pressed && canContinue && styles.pressed,
        ]}
      >
        <Text style={styles.continueText}>Review order</Text>
        <Text style={styles.continueArrow}>→</Text>
      </Pressable>
      {!canContinue && (
        <Text style={styles.formHint}>Enter your name, phone number, and address to continue.</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', gap: 14, marginBottom: 24 },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, height: 46, justifyContent: 'center', width: 46 },
  backArrow: { color: colors.text, fontSize: 24 },
  title: { color: colors.text, fontSize: 24, fontWeight: '900', letterSpacing: -0.7 },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  formCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 20, borderWidth: 1, padding: 18 },
  sectionLabel: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginBottom: 5 },
  addressSection: { marginTop: 22 },
  label: { color: colors.text, fontSize: 12, fontWeight: '700', marginBottom: 7, marginTop: 13 },
  input: { backgroundColor: colors.background, borderColor: colors.border, borderRadius: 13, borderWidth: 1, color: colors.text, fontSize: 14, minHeight: 48, paddingHorizontal: 14, paddingVertical: 12 },
  phoneRow: { flexDirection: 'row', gap: 8 },
  countryCode: { alignItems: 'center', backgroundColor: colors.primarySoft, borderColor: colors.border, borderRadius: 13, borderWidth: 1, justifyContent: 'center', minHeight: 48, width: 58 },
  countryCodeText: { color: colors.primary, fontSize: 14, fontWeight: '800' },
  phoneInput: { flex: 1 },
  addressInput: { minHeight: 94 },
  notesInput: { minHeight: 76 },
  orderSummary: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, padding: 16 },
  summaryLabel: { color: colors.text, fontSize: 13, fontWeight: '800' },
  summaryHint: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  summaryTotal: { color: colors.text, fontSize: 20, fontWeight: '900' },
  continueButton: { alignItems: 'center', backgroundColor: colors.hero, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingHorizontal: 20, paddingVertical: 17 },
  continueButtonDisabled: { backgroundColor: '#AEB4BF' },
  continueText: { color: colors.onHero, fontSize: 15, fontWeight: '800' },
  continueArrow: { color: colors.accent, fontSize: 22 },
  formHint: { color: colors.textMuted, fontSize: 10, marginTop: 9, textAlign: 'center' },
  pressed: { opacity: 0.7 },
});
