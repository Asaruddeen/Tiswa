import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, ScreenTitle, Icon, FadeIn, EmptyState } from '../components/ui';
import { colors, radius, shadow } from '../lib/theme';
import { formatDateTime } from '../lib/utils';

const STATUS = {
  upcoming: { bg: '#dbeafe', fg: '#1e40af', icon: 'clock' },
  ongoing: { bg: '#dcfce7', fg: '#166534', icon: 'circle-play' },
  completed: { bg: '#f3f4f6', fg: '#1f2937', icon: 'circle-check' },
  cancelled: { bg: '#fee2e2', fg: '#991b1b', icon: 'circle-xmark' },
};
const FILTERS = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function StatusBadge({ status, style }) {
  const s = STATUS[status] || { bg: '#f3f4f6', fg: '#1f2937', icon: 'calendar-day' };
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }, style]}>
      <Icon name={s.icon} size={10} color={s.fg} style={{ marginRight: 4 }} />
      <Text style={{ color: s.fg, fontSize: 11, fontWeight: '600' }}>{status}</Text>
    </View>
  );
}

export default function Events({ events, loading }) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const list = filter === 'all' ? events : events.filter((e) => e.status === filter);

  return (
    <FadeIn>
      <ScreenTitle
        icon="calendar-days"
        title="Events"
        right={<View style={styles.count}><Text style={{ fontSize: 13, color: '#6b7280' }}>{events.length} Events</Text></View>}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 14 }}>
        {FILTERS.map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.chip, filter === f && styles.chipOn]}>
            <Text style={[styles.chipText, filter === f && { color: '#fff' }]}>{cap(f)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {loading ? (
        <View style={{ paddingVertical: 48 }}><ActivityIndicator size="large" color={colors.green700} /></View>
      ) : list.length === 0 ? (
        <EmptyState title="No events found" sub="Check back later for updates" />
      ) : (
        <View style={{ gap: 16 }}>
          {list.map((ev, i) => (
            <FadeIn key={ev._id || i} delay={Math.min(i, 5) * 60}>
              <Card onPress={() => setSelected(ev)} style={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
                {ev.image ? (
                  <View style={{ height: 180, backgroundColor: '#e5e7eb' }}>
                    <Image source={{ uri: ev.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    <StatusBadge status={ev.status} style={{ position: 'absolute', top: 12, right: 12 }} />
                  </View>
                ) : null}
                <View style={{ padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <Text style={styles.evTitle} numberOfLines={1}>{ev.title}</Text>
                    {!ev.image ? <StatusBadge status={ev.status} /> : null}
                  </View>
                  <View style={styles.meta}><Icon name="calendar-day" size={13} color="#4b5563" /><Text style={styles.metaText}>{formatDateTime(ev.date)}</Text></View>
                  {ev.location ? <View style={styles.meta}><Icon name="location-dot" size={13} color="#4b5563" /><Text style={styles.metaText} numberOfLines={1}>{ev.location}</Text></View> : null}
                  <Text style={styles.desc} numberOfLines={2}>{ev.description}</Text>
                  <View style={styles.more}>
                    <Text style={{ color: colors.green700, fontWeight: '600', fontSize: 14 }}>View Details  </Text>
                    <Icon name="arrow-right" size={11} />
                  </View>
                </View>
              </Card>
            </FadeIn>
          ))}
        </View>
      )}

      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)} statusBarTranslucent>
        <Pressable style={styles.backdrop} onPress={() => setSelected(null)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {selected ? (
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {selected.image ? (
                  <View style={{ height: 220, backgroundColor: '#e5e7eb' }}>
                    <Image source={{ uri: selected.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    <StatusBadge status={selected.status} style={{ position: 'absolute', bottom: 12, right: 12 }} />
                  </View>
                ) : null}
                <Pressable onPress={() => setSelected(null)} style={styles.closeX} hitSlop={10}>
                  <Icon name="xmark" size={16} color="#fff" />
                </Pressable>
                <View style={{ padding: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <Text style={styles.sheetTitle}>{selected.title}</Text>
                    {!selected.image ? <StatusBadge status={selected.status} /> : null}
                  </View>
                  <View style={styles.infoBox}><Icon name="calendar-day" size={14} /><Text style={styles.infoText}>{formatDateTime(selected.date)}</Text></View>
                  {selected.location ? <View style={styles.infoBox}><Icon name="location-dot" size={14} /><Text style={styles.infoText}>{selected.location}</Text></View> : null}
                  <Text style={styles.descH}>Description</Text>
                  <Text style={styles.descFull}>{selected.description}</Text>
                  <Pressable onPress={() => setSelected(null)} style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.85 }]}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Close</Text>
                  </Pressable>
                </View>
              </ScrollView>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  count: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, ...shadow, shadowOpacity: 0.05, elevation: 1 },
  chip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 999, backgroundColor: '#fff', ...shadow, shadowOpacity: 0.04, elevation: 1 },
  chipOn: { backgroundColor: colors.green700 },
  chipText: { fontSize: 12, fontWeight: '500', color: '#374151' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  evTitle: { fontSize: 18, fontWeight: '700', color: colors.text, flex: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  metaText: { fontSize: 13.5, color: '#4b5563', flexShrink: 1 },
  desc: { fontSize: 13.5, color: '#4b5563', marginTop: 10, lineHeight: 20 },
  more: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', padding: 12 },
  sheet: { backgroundColor: '#fff', borderRadius: 28, maxHeight: '88%', overflow: 'hidden', width: '100%', maxWidth: 480, alignSelf: 'center' },
  closeX: { position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  sheetTitle: { fontSize: 22, fontWeight: '700', color: colors.text, flex: 1 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', padding: 10, borderRadius: 14, marginTop: 10 },
  infoText: { fontSize: 14, color: '#4b5563', flex: 1 },
  descH: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 18, marginBottom: 6 },
  descFull: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  closeBtn: { backgroundColor: colors.green700, paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 20 },
});
