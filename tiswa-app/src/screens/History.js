import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ScreenTitle, Pill, Icon, FadeIn, EmptyState } from '../components/ui';
import { colors } from '../lib/theme';
import { formatDate, formatCurrency } from '../lib/utils';

export default function History({ payments }) {
  const sorted = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <FadeIn>
      <ScreenTitle icon="receipt" title="GPay Style Ledger" />
      {sorted.length === 0 ? (
        <EmptyState icon="receipt" title="No transactions yet" />
      ) : (
        <Card style={{ padding: 6 }}>
          {sorted.map((p, i) => (
            <View key={p._id || i} style={[styles.row, i < sorted.length - 1 && styles.rowBorder]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.date}>{formatDate(p.date)}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 5 }}>
                <Text style={styles.amount}>{formatCurrency(p.amount)}</Text>
                <Pill text={p.status || 'Success'} icon="circle-check" />
              </View>
            </View>
          ))}
        </Card>
      )}
      <View style={styles.foot}>
        <Icon name="shield-halved" size={11} color={colors.textMuted} />
        <Text style={styles.footText}>All transactions verified & immutable</Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  name: { fontWeight: '500', color: colors.text, fontSize: 15 },
  date: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  amount: { color: colors.green700, fontWeight: '700', fontSize: 15 },
  foot: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 },
  footText: { color: colors.textMuted, fontSize: 12 },
});
