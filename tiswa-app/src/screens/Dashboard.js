import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Card, GradientCard, ScreenTitle, Icon, FadeIn } from '../components/ui';
import { colors } from '../lib/theme';
import { formatCurrency, getTotalCollected, getTotalSpent, getRemainingBalance } from '../lib/utils';

export default function Dashboard({ payments, expenses }) {
  const collected = getTotalCollected(payments);
  const spent = getTotalSpent(expenses);
  const remaining = getRemainingBalance(payments, expenses);
  const pct = collected ? Math.max(0, Math.min(100, (remaining / collected) * 100)) : 0;

  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: pct, duration: 900, delay: 300, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [pct, w]);

  return (
    <View>
      <FadeIn><ScreenTitle icon="chart-line" title="Balance Dashboard" /></FadeIn>
      <View style={{ gap: 16 }}>
        <FadeIn delay={60}>
          <Card style={styles.stat}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Total Collected</Text>
              <Text style={[styles.value, { color: colors.green700 }]} adjustsFontSizeToFit numberOfLines={1}>{formatCurrency(collected)}</Text>
            </View>
            <Icon name="hand-holding-dollar" size={38} color="#bbf7d0" />
          </Card>
        </FadeIn>
        <FadeIn delay={140}>
          <Card style={styles.stat}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Total Spent</Text>
              <Text style={[styles.value, { color: colors.rose }]} adjustsFontSizeToFit numberOfLines={1}>{formatCurrency(spent)}</Text>
            </View>
            <Icon name="chart-simple" size={38} color="#fecdd3" />
          </Card>
        </FadeIn>
        <FadeIn delay={220}>
          <GradientCard>
            <Text style={styles.remLabel}>REMAINING BALANCE</Text>
            <Text style={styles.remValue} adjustsFontSizeToFit numberOfLines={1}>{formatCurrency(remaining)}</Text>
            <View style={styles.track}>
              <Animated.View style={[styles.fill, { width: w.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Text style={styles.foot}>💰 Community Fund</Text>
              <Text style={styles.foot}>⚡ {Math.round(pct)}% reserve</Text>
            </View>
          </GradientCard>
        </FadeIn>
        <Text style={styles.live}>Real-time financial integrity</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 20 },
  label: { color: '#6b7280', fontSize: 14 },
  value: { fontSize: 30, fontWeight: '800', marginTop: 2 },
  remLabel: { color: '#dcfce7', fontSize: 13, letterSpacing: 1 },
  remValue: { color: '#fff', fontSize: 38, fontWeight: '900', marginTop: 4 },
  track: { height: 8, borderRadius: 8, backgroundColor: 'rgba(5,46,22,0.4)', marginTop: 16, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 8, backgroundColor: '#fff' },
  foot: { color: '#dcfce7', fontSize: 12 },
  live: { textAlign: 'center', color: colors.textMuted, fontSize: 11, marginTop: 2 },
});
