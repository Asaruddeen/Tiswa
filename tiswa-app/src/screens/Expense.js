import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ScreenTitle, Pill, FadeIn, EmptyState } from '../components/ui';
import { colors } from '../lib/theme';
import { formatDate, formatCurrency, getTotalSpent } from '../lib/utils';

export default function Expense({ expenses }) {
  const total = getTotalSpent(expenses);
  return (
    <FadeIn>
      <ScreenTitle icon="cart-shopping" title="Expense Tracker" right={<Pill text={formatCurrency(total)} bg={colors.redSoft} fg="#b91c1c" />} />
      {expenses.length === 0 ? (
        <EmptyState icon="cart-shopping" title="No expenses yet" />
      ) : (
        <Card style={{ padding: 6 }}>
          {expenses.map((e, i) => (
            <View key={e._id || i} style={[styles.row, i < expenses.length - 1 && styles.rowBorder]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.item}>{e.item}</Text>
                <Text style={styles.date}>{formatDate(e.date)}</Text>
              </View>
              <Text style={styles.amount}>{formatCurrency(e.amount)}</Text>
            </View>
          ))}
        </Card>
      )}
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  item: { fontWeight: '500', color: colors.text, fontSize: 15 },
  date: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  amount: { color: colors.red, fontWeight: '600', fontSize: 15 },
});
