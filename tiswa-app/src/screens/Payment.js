import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Card, ScreenTitle, Icon, FadeIn } from '../components/ui';
import { colors } from '../lib/theme';
import { formatDate, formatCurrency } from '../lib/utils';

export default function Payment({ payments, settings }) {
  const upi = settings?.upiId || 'tiswa@icici';
  const recentThree = [...payments].slice(-3).reverse();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await Clipboard.setStringAsync(upi);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const payNow = async () => {
    const url = `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent('TISWA')}&cu=INR`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('No UPI app found', `Copy the UPI ID (${upi}) and pay from your UPI app.`);
    }
  };

  return (
    <FadeIn>
      <ScreenTitle icon="qrcode" title="Quick Donation" />
      <Card style={{ alignItems: 'center', padding: 24 }}>
        <View style={styles.qrBox}>
          {settings?.qrImage ? (
            <Image source={{ uri: settings.qrImage }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          ) : (
            <>
              <Icon name="mosque" size={44} color="rgba(22,101,52,0.7)" />
              <Icon name="qrcode" size={44} style={{ marginTop: 4 }} />
              <Text style={{ fontSize: 10, color: '#6b7280', marginTop: 8 }}>TISWA Official QR</Text>
            </>
          )}
        </View>

        <View style={styles.btnRow}>
          <Pressable style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.85 }]} onPress={payNow}>
            <Icon name="mobile-screen" size={14} color="#fff" />
            <Text style={styles.btnPrimaryText}>Pay with UPI app</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.85 }]} onPress={copy}>
            <Icon name={copied ? 'circle-check' : 'copy'} size={14} />
            <Text style={styles.btnGhostText}>{copied ? 'Copied' : 'Copy ID'}</Text>
          </Pressable>
        </View>

        <View style={styles.instr}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="circle-info" size={15} color="#166534" />
            <Text style={{ fontWeight: '700', color: '#166534' }}>Payment Instructions</Text>
          </View>
          <Text style={styles.li}>•  Scan QR using any UPI app (GPay, PhonePe, Paytm)</Text>
          <Text style={styles.li}>•  UPI ID: <Text style={styles.bold}>{upi}</Text></Text>
          <Text style={styles.li}>•  Enter amount & mention your <Text style={styles.bold}>Full Name</Text></Text>
          <Text style={styles.li}>•  Payment reflects within 2 hours in history</Text>
        </View>
      </Card>

      <Card style={{ marginTop: 18, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon name="clock" size={14} color={colors.text} />
          <Text style={{ fontWeight: '600', color: colors.text }}>Latest Contributions</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          {recentThree.map((p, i) => (
            <View key={p._id || i} style={styles.pRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: colors.text }}>{p.name}</Text>
                <Text style={{ fontSize: 10, color: colors.textMuted }}>{formatDate(p.date)}</Text>
              </View>
              <Text style={{ color: colors.green700, fontWeight: '700' }}>{formatCurrency(p.amount)}</Text>
            </View>
          ))}
        </View>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  qrBox: { width: 176, height: 176, borderRadius: 18, backgroundColor: '#fff', borderWidth: 2, borderColor: '#bbf7d0', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 18, width: '100%' },
  btnPrimary: { flex: 1.6, flexDirection: 'row', gap: 8, backgroundColor: colors.green700, paddingVertical: 13, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  btnGhost: { flex: 1, flexDirection: 'row', gap: 8, backgroundColor: colors.green50, borderWidth: 1, borderColor: '#bbf7d0', paddingVertical: 13, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnGhostText: { color: '#166534', fontWeight: '600', fontSize: 14 },
  instr: { marginTop: 18, alignSelf: 'stretch', backgroundColor: 'rgba(240,253,244,0.8)', padding: 16, borderRadius: 18, gap: 6 },
  li: { fontSize: 13.5, color: '#374151', lineHeight: 20 },
  bold: { fontWeight: '700', color: colors.text },
  pRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
});
