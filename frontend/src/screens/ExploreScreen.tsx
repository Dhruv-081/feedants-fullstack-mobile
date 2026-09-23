import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, ChevronRight } from 'lucide-react-native';

export const ExploreScreen = ({ onCompClick }: { onCompClick: () => void }) => {
  const [search, setSearch] = useState('');
  const categories = ['Classical', 'Hip-Hop', 'Folk', 'Contemporary', 'Bollywood'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search competitions..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
        {categories.map(cat => (
          <TouchableOpacity key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Trending Now</Text>
      <View style={styles.list}>
        {[1, 2, 3].map(i => (
          <TouchableOpacity key={i} style={styles.trendCard} onPress={onCompClick}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=150' }}
              style={styles.trendImage}
            />
            <View style={styles.trendInfo}>
              <Text style={styles.trendTitle}>Monsoon Special Solo</Text>
              <Text style={styles.trendSub}>₹2,000 Pool • 12 Spots left</Text>
              <View style={styles.trendFooter}>
                <Text style={styles.priceText}>₹49 Entry</Text>
                <ChevronRight size={16} color="#64748B" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  searchContainer: { position: 'relative', marginBottom: 16 },
  searchIcon: { position: 'absolute', left: 12, top: 12 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingVertical: 12, paddingLeft: 40, paddingRight: 16, fontSize: 14, color: '#0F172A' },
  categoriesRow: { marginBottom: 24 },
  categoryChip: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, marginRight: 8 },
  categoryText: { fontSize: 12, fontWeight: '500', color: '#0F172A' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#0F172A' },
  list: { gap: 12 },
  trendCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', gap: 12 },
  trendImage: { width: 72, height: 72, borderRadius: 8 },
  trendInfo: { flex: 1, justifyContent: 'space-between' },
  trendTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  trendSub: { fontSize: 11, color: '#64748B' },
  trendFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 12, fontWeight: 'bold', color: '#008080' },
});
