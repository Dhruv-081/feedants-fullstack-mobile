import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface CountdownTimerProps {
  targetDate: string | Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulse animation: scale up and down
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, easing: Easing.ease, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, easing: Easing.ease, useNativeDriver: true }),
      ])
    ).start();

    const calculateTimeLeft = () => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: pulseAnim }] }]}>
      <Text style={styles.label}>⏳ Registration closes in</Text>
      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{pad(timeLeft.days)}d</Text>
        <Text style={styles.sep}>:</Text>
        <Text style={styles.timerText}>{pad(timeLeft.hours)}h</Text>
        <Text style={styles.sep}>:</Text>
        <Text style={styles.timerText}>{pad(timeLeft.minutes)}m</Text>
        <Text style={styles.sep}>:</Text>
        <Text style={styles.timerText}>{pad(timeLeft.seconds)}s</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFEDD5', padding: 12, borderRadius: 12, alignItems: 'center', marginVertical: 16, borderWidth: 1, borderColor: '#FDBA74', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  label: { fontSize: 12, color: '#9A3412', fontWeight: 'bold', marginBottom: 6 },
  timerRow: { flexDirection: 'row', alignItems: 'center' },
  timerText: { fontSize: 16, fontWeight: '900', color: '#9A3412', width: 40, textAlign: 'center' },
  sep: { fontSize: 16, fontWeight: 'bold', color: '#9A3412' },
});
