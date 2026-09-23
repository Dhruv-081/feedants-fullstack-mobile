import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

export const CompetitionsScreen = ({ onCompClick }: { onCompClick: () => void }) => {
  const [tab, setTab] = useState<'Ongoing' | 'Upcoming' | 'Past'>('Ongoing');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Competitions</Text>
        <View style={styles.tabsRow}>
          {(['Ongoing', 'Upcoming', 'Past'] as const).map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.activeTab]}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {[1, 2, 3].map(i => (
          <TouchableOpacity key={i} style={styles.compCard} onPress={onCompClick}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80' }}
                style={styles.image}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>₹1,500 Prize Pool</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.compTitle}>Feedants Classical Dance {i}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.feeText}>Entry Fee: <Text style={styles.feeValue}>₹99</Text></Text>
                <View style={styles.regBtn}>
                  <Text style={styles.regBtnText}>Register Now</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingTop: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#0F172A' },
  tabsRow: { flexDirection: 'row', gap: 24 },
  tabBtn: { paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#008080' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#008080' },
  list: { padding: 16, gap: 16 },
  compCard: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  imageContainer: { height: 160, position: 'relative' },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#0F172A' },
  cardBody: { padding: 16 },
  compTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  feeText: { fontSize: 12, color: '#64748B' },
  feeValue: { fontWeight: 'bold', color: '#008080' },
  regBtn: { backgroundColor: '#008080', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  regBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
});
