import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, RefreshControl, Animated, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import Home from './src/screens/Home';
import Members from './src/screens/Members';
import Payment from './src/screens/Payment';
import History from './src/screens/History';
import Events from './src/screens/Events';
import Expense from './src/screens/Expense';
import Dashboard from './src/screens/Dashboard';
import { Icon } from './src/components/ui';
import { apiGet } from './src/lib/api';
import { colors, shadow } from './src/lib/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const NAV = [
  { id: 'home', icon: 'house', label: 'Home' },
  { id: 'members', icon: 'users', label: 'Members' },
  { id: 'payment', icon: 'qrcode', label: 'Pay' },
  { id: 'history', icon: 'clock-rotate-left', label: 'History' },
  { id: 'events', icon: 'calendar-days', label: 'Events' },
  { id: 'expense', icon: 'receipt', label: 'Expense' },
  { id: 'dashboard', icon: 'chart-line', label: 'Balance' },
];

function Shell() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [page, setPage] = useState('home');
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState({ upiId: 'tiswa@icici', qrImage: '' });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setError(false);
    const results = await Promise.allSettled([
      apiGet('/members'), apiGet('/payments'), apiGet('/expenses'), apiGet('/settings'), apiGet('/events'),
    ]);
    const [m, p, x, s, e] = results;
    if (m.status === 'fulfilled' && Array.isArray(m.value)) setMembers(m.value);
    if (p.status === 'fulfilled' && Array.isArray(p.value)) setPayments(p.value);
    if (x.status === 'fulfilled' && Array.isArray(x.value)) setExpenses(x.value);
    if (s.status === 'fulfilled' && s.value && !Array.isArray(s.value)) setSettings((prev) => ({ ...prev, ...s.value }));
    if (e.status === 'fulfilled' && Array.isArray(e.value)) setEvents(e.value);
    if (results.every((r) => r.status === 'rejected')) setError(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    load().finally(() => SplashScreen.hideAsync().catch(() => {}));
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  // Android back button: go to Home first, then exit
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (page !== 'home') { setPage('home'); return true; }
      return false;
    });
    return () => sub.remove();
  }, [page]);

  const go = (id) => {
    setPage(id);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: insets.top + 18, paddingHorizontal: 16, paddingBottom: insets.bottom + 110, maxWidth: 560, width: '100%', alignSelf: 'center' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.green700]} tintColor={colors.green700} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {error && (
          <Pressable onPress={onRefresh} style={styles.offline}>
            <Icon name="triangle-exclamation" size={14} color="#92400e" />
            <Text style={styles.offlineText}>Can't reach the server. Tap to retry.</Text>
          </Pressable>
        )}
        {page === 'home' && <Home payments={payments} expenses={expenses} />}
        {page === 'members' && <Members members={members} />}
        {page === 'payment' && <Payment payments={payments} settings={settings} />}
        {page === 'history' && <History payments={payments} />}
        {page === 'events' && <Events events={events} loading={loading} />}
        {page === 'expense' && <Expense expenses={expenses} />}
        {page === 'dashboard' && <Dashboard payments={payments} expenses={expenses} />}
      </ScrollView>

      <View pointerEvents="box-none" style={[styles.navWrap, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.nav}>
          {NAV.map((n) => <NavButton key={n.id} item={n} active={page === n.id} onPress={() => go(n.id)} />)}
        </View>
      </View>
    </View>
  );
}

function NavButton({ item, active, onPress }) {
  const s = useRef(new Animated.Value(active ? 1 : 0)).current;
  useEffect(() => {
    Animated.spring(s, { toValue: active ? 1 : 0, useNativeDriver: true, friction: 6, tension: 140 }).start();
  }, [active, s]);
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }} accessibilityRole="button" accessibilityLabel={item.label}>
      <Animated.View
        style={[
          styles.navBtn,
          active && styles.navBtnOn,
          { transform: [{ scale: s.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) }] },
        ]}
      >
        <Icon name={item.icon} size={17} color={active ? '#fff' : '#4b5563'} />
        <Text style={[styles.navLabel, { color: active ? '#fff' : '#4b5563' }]} numberOfLines={1}>{item.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Shell />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  navWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 8 },
  nav: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 26, padding: 6, maxWidth: 480, width: '100%', alignSelf: 'center', ...shadow, shadowOpacity: 0.18, shadowRadius: 20, elevation: 10 },
  navBtn: { alignItems: 'center', justifyContent: 'center', gap: 3, paddingVertical: 8, borderRadius: 18, minHeight: 48 },
  navBtnOn: { backgroundColor: '#15803d', shadowColor: '#0f4c2a', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  navLabel: { fontSize: 9.5, fontWeight: '500' },
  offline: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fef3c7', padding: 12, borderRadius: 14, marginBottom: 14 },
  offlineText: { color: '#92400e', fontSize: 13, flex: 1 },
});
