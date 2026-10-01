import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadow, gradient } from '../lib/theme';

export const Icon = ({ name, size = 16, color = colors.green700, style }) => (
  <FontAwesome6 name={name} size={size} color={color} style={style} solid />
);

// Fade + slide-up on mount (matches the web "animate-float")
export function FadeIn({ children, delay = 0, style }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 380, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v, delay]);
  return (
    <Animated.View
      style={[{ opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }, style]}
    >
      {children}
    </Animated.View>
  );
}

// Card with press-scale feedback when onPress is given
export function Card({ children, style, onPress }) {
  const s = useRef(new Animated.Value(1)).current;
  const to = (x) => Animated.spring(s, { toValue: x, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  if (!onPress) return <View style={[styles.card, style]}>{children}</View>;
  return (
    <Pressable onPress={onPress} onPressIn={() => to(0.98)} onPressOut={() => to(1)}>
      <Animated.View style={[styles.card, style, { transform: [{ scale: s }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export const GradientCard = ({ children, style }) => (
  <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradCard, style]}>
    {children}
  </LinearGradient>
);

export const ScreenTitle = ({ icon, title, right }) => (
  <View style={styles.titleRow}>
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <Icon name={icon} size={20} style={{ marginRight: 10 }} />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
    {right}
  </View>
);

export const Pill = ({ text, bg = colors.green100, fg = '#166534', icon }) => (
  <View style={[styles.pill, { backgroundColor: bg }]}>
    {icon ? <Icon name={icon} size={10} color={fg} style={{ marginRight: 4 }} /> : null}
    <Text style={[styles.pillText, { color: fg }]}>{text}</Text>
  </View>
);

export const EmptyState = ({ icon = 'calendar-plus', title, sub }) => (
  <View style={styles.empty}>
    <Icon name={icon} size={44} color="#d1d5db" />
    <Text style={{ color: colors.textSoft, marginTop: 12, fontSize: 15 }}>{title}</Text>
    {sub ? <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: 12 }}>{sub}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.card, padding: 20, ...shadow },
  gradCard: { borderRadius: 24, padding: 22, ...shadow, shadowOpacity: 0.18 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, flexShrink: 1 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
  pillText: { fontSize: 11, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 48, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 24 },
});
