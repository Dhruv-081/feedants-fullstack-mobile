import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Trophy, User, Plus } from 'lucide-react-native';

export const BottomTabBar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <View style={styles.container}>
      <NavItem
        icon={<Home size={22} color={activeTab === 'Home' ? '#008080' : '#64748B'} />}
        label="Home"
        active={activeTab === 'Home'}
        onPress={() => setActiveTab('Home')}
      />
      <NavItem
        icon={<Search size={22} color={activeTab === 'Explore' ? '#008080' : '#64748B'} />}
        label="Explore"
        active={activeTab === 'Explore'}
        onPress={() => setActiveTab('Explore')}
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <NavItem
        icon={<Trophy size={22} color={activeTab === 'Competitions' ? '#008080' : '#64748B'} />}
        label="Competitions"
        active={activeTab === 'Competitions'}
        onPress={() => setActiveTab('Competitions')}
      />
      <NavItem
        icon={<User size={22} color={activeTab === 'Profile' ? '#008080' : '#64748B'} />}
        label="Profile"
        active={activeTab === 'Profile'}
        onPress={() => setActiveTab('Profile')}
      />
    </View>
  );
};

const NavItem = ({ icon, label, active, onPress }: { icon: React.ReactNode, label: string, active: boolean, onPress: () => void }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    {icon}
    <Text style={[styles.navLabel, active && styles.activeLabel]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 75, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navLabel: { fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: '500' },
  activeLabel: { color: '#008080', fontWeight: 'bold' },
  fabContainer: { alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: -20 },
  fab: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#008080', alignItems: 'center', justifyContent: 'center', shadowColor: '#008080', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }
});
