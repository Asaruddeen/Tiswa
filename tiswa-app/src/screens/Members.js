import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ScreenTitle, Pill, Icon, FadeIn, EmptyState } from '../components/ui';
import { colors } from '../lib/theme';

export default function Members({ members }) {
  return (
    <FadeIn>
      <ScreenTitle icon="users" title="Leadership & Members" right={<Pill text={`${members.length} registered`} />} />
      {members.length === 0 ? (
        <EmptyState icon="users" title="No members yet" />
      ) : (
        <Card style={{ padding: 6 }}>
          {members.map((m, i) => (
            <View key={m._id || i} style={[styles.row, i < members.length - 1 && styles.rowBorder]}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{(m.name || '?').charAt(0).toUpperCase()}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{m.name}</Text>
                <Text style={styles.mobile}>{m.mobile}</Text>
              </View>
              <Pill text={m.role} />
            </View>
          ))}
        </Card>
      )}
      <View style={styles.foot}>
        <Icon name="address-card" size={11} color={colors.textMuted} />
        <Text style={styles.footText}>Verified community directory</Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.green100, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#166534', fontWeight: '700', fontSize: 16 },
  name: { fontWeight: '600', color: colors.text, fontSize: 15 },
  mobile: { color: '#6b7280', fontSize: 12, marginTop: 1 },
  foot: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 16 },
  footText: { color: colors.textMuted, fontSize: 11 },
});
