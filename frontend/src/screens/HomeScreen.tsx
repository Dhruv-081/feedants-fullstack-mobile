import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, ChevronRight, Plus } from 'lucide-react-native';

export const HomeScreen = ({ onCompClick }: { onCompClick: () => void }) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Namaste, Dhruv!</Text>
        <Text style={styles.subtext}>Ready to dance today?</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150' }}
          style={styles.avatar}
        />
      </View>
    </View>

    <Text style={styles.sectionTitle}>My Competitions</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      {[1, 2].map(i => (
        <TouchableOpacity key={i} style={styles.compCard} onPress={onCompClick}>
          <View style={styles.compHeader}>
            <Text style={styles.compTag}>Classical Dance</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Registered</Text>
            </View>
          </View>
          <Text style={styles.compTitle}>Feedants Classical Solo</Text>
          <Text style={styles.compFooter}>Submission closes in 2 days</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.statsRow}>
      <StatCard label="Joined" value="12" />
      <StatCard label="Wins" value="03" />
      <StatCard label="Certificates" value="08" />
    </View>

    <TouchableOpacity style={styles.referBanner}>
      <View style={styles.referContent}>
        <View style={styles.iconBg}><Plus size={20} color="#008080" /></View>
        <View>
          <Text style={styles.referTitle}>Refer & Earn</Text>
          <Text style={styles.referSub}>Get ₹10 for every signup</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#64748B" />
    </TouchableOpacity>
  </ScrollView>
);

const StatCard = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  subtext: { fontSize: 14, color: '#64748B' },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#008080', overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#0F172A' },
  horizontalScroll: { marginBottom: 24 },
  compCard: { minWidth: 280, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginRight: 16, borderWeight: 1, borderColor: '#E2E8F0' },
  compHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  compTag: { fontSize: 10, fontWeight: 'bold', color: '#008080', textTransform: 'uppercase' },
  statusBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  statusText: { fontSize: 10, fontWeight: 'bold', color: '#15803D' },
  compTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  compFooter: { fontSize: 12, color: '#64748B', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, alignItems: 'center', borderWeight: 1, borderColor: '#E2E8F0' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#008080' },
  statLabel: { fontSize: 10, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginTop: 2 },
  referBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F9F9', padding: 16, borderRadius: 16 },
  referContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBg: { backgroundColor: '#CCFBF1', padding: 8, borderRadius: 8 },
  referTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  referSub: { fontSize: 12, color: '#0D9488' },
});
