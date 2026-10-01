import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, GradientCard, Icon, FadeIn } from '../components/ui';
import { colors, gradient } from '../lib/theme';
import { getRemainingBalance, formatCurrency, getRecentActivity, formatToday } from '../lib/utils';

export default function Home({ payments, expenses }) {
  const balance = getRemainingBalance(payments, expenses);
  const activities = getRecentActivity(payments, expenses);

  return (
    <View style={{ gap: 18 }}>
      <FadeIn delay={0}>
        <Card style={styles.headerCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <LinearGradient colors={gradient} style={styles.logoBox}>
              <Icon name="mosque" size={30} color="#fff" />
            </LinearGradient>
            <Text style={styles.brand}>TISWA</Text>
          </View>
          <View style={styles.unity}>
            <Icon name="shield-halved" size={11} color="#166534" />
            <Text style={styles.unityText}>Unity</Text>
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={80}>
        <Card style={{ borderLeftWidth: 8, borderLeftColor: colors.green700 }}>
          <Text style={styles.quote}>
            <Icon name="quote-left" size={13} color="#16a34a" />{'  '}
            Serving community with integrity, transparency, and collective growth. Every contribution builds a stronger tomorrow.
          </Text>
        </Card>
      </FadeIn>

      <FadeIn delay={160}>
        <GradientCard>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.balLabel}>TOTAL BALANCE</Text>
              <Text style={styles.balValue} adjustsFontSizeToFit numberOfLines={1}>{formatCurrency(balance)}</Text>
            </View>
            <Icon name="hand-holding-heart" size={38} color="rgba(255,255,255,0.3)" />
          </View>
          <View style={styles.balFooter}>
            <Text style={styles.balDate}>{formatToday()}</Text>
            <View style={styles.verified}><Text style={styles.verifiedText}>Verified</Text></View>
          </View>
        </GradientCard>
      </FadeIn>

      <FadeIn delay={240}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="wave-square" size={16} />
            <Text style={styles.h2}>Recent Activity</Text>
          </View>
          <View style={{ marginTop: 12, gap: 10 }}>
            {activities.map((a, i) => (
              <View key={i} style={styles.act}>
                <View style={styles.actIcon}><Text>{a.icon}</Text></View>
                <Text style={styles.actText}>{a.text}</Text>
              </View>
            ))}
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={320}>
        <View style={styles.powered}>
          <View style={styles.crown}><Icon name="crown" size={10} color="#fff" /></View>
          <Text style={{ fontSize: 12, color: colors.textSoft }}>Powered by</Text>
          <Text style={styles.poweredBrand}>Yunrah Technologies</Text>
          <Text style={styles.ver}>v1.0.0</Text>
        </View>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoBox: { width: 62, height: 62, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 26, fontWeight: '800', color: colors.text, letterSpacing: 0.5 },
  unity: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.green100, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  unityText: { fontSize: 11, fontWeight: '600', color: '#166534' },
  quote: { fontSize: 14, lineHeight: 22, color: colors.textSoft },
  balLabel: { color: '#dcfce7', fontSize: 13, fontWeight: '600', letterSpacing: 1 },
  balValue: { color: '#fff', fontSize: 38, fontWeight: '700', marginTop: 4 },
  balFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  balDate: { color: '#dcfce7', fontSize: 12, flexShrink: 1 },
  verified: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  verifiedText: { color: '#dcfce7', fontSize: 12 },
  h2: { fontSize: 18, fontWeight: '700', color: colors.text },
  act: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 8, borderRadius: 14, backgroundColor: '#f9fafb' },
  actIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.green100, alignItems: 'center', justifyContent: 'center' },
  actText: { flex: 1, fontSize: 13.5, color: '#374151' },
  powered: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.65)', borderRadius: 18, padding: 12, borderWidth: 1, borderColor: 'rgba(22,163,74,0.15)', flexWrap: 'wrap' },
  crown: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#15803d', alignItems: 'center', justifyContent: 'center' },
  poweredBrand: { fontSize: 14, fontWeight: '700', color: '#15803d' },
  ver: { fontSize: 10, color: colors.textMuted, backgroundColor: '#f3f4f6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, overflow: 'hidden' },
});
