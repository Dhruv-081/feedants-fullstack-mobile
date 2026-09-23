import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User, Trophy, Shield, Info, Plus, ChevronRight } from 'lucide-react-native';

export const ProfileScreen = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View style={styles.profileHeader}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150' }}
          style={styles.avatar}
        />
        <View style={styles.editBadge}>
          <Plus size={14} color="#FFFFFF" />
        </View>
      </View>
      <Text style={styles.name}>Dhruv Choudhary</Text>
      <Text style={styles.bio}>Bharatnatyam & Folk Dancer</Text>
    </View>

    <View style={styles.list}>
      <ProfileItem icon={<User size={20} color="#008080" />} label="Edit Profile" />
      <ProfileItem icon={<Trophy size={20} color="#008080" />} label="My Achievements" />
      <ProfileItem icon={<Shield size={20} color="#008080" />} label="Security & Privacy" />
      <ProfileItem icon={<Info size={20} color="#008080" />} label="Help & Support" />

      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const ProfileItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <ChevronRight size={20} color="#64748B" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  profileHeader: { alignItems: 'center', marginVertical: 24 },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#FFFFFF' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#008080', padding: 6, borderRadius: 999, borderWidth: 2, borderColor: '#FFFFFF' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  bio: { fontSize: 14, color: '#64748B', marginTop: 4 },
  list: { gap: 12 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemLabel: { fontSize: 14, fontWeight: '500', color: '#0F172A' },
  logoutBtn: { backgroundColor: '#FEF2F2', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  logoutText: { color: '#EF4444', fontWeight: 'bold', fontSize: 14 },
});
