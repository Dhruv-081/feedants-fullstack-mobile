import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface JudgeCardProps {
  judge: {
    name: string;
    role: string;
    experience: string;
    profileImage: string;
    introVideoUrl: string;
  };
  onPlayVideo?: () => void;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge, onPlayVideo }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Image source={{ uri: judge.profileImage }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.label}>Judge</Text>
          <Text style={styles.name}>{judge.name}</Text>
          <Text style={styles.title}>{judge.role}</Text>
          <Text style={styles.experience}>{judge.experience}</Text>
        </View>
        <TouchableOpacity style={styles.videoBtn} onPress={onPlayVideo}>
          <View style={styles.playIconContainer}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <Text style={styles.videoText}>Intro Video</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Judge Profile Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={{ uri: judge.profileImage }} style={styles.modalAvatar} />
            <Text style={styles.modalName}>{judge.name}</Text>
            <Text style={styles.modalTitle}>{judge.role}</Text>
            <Text style={styles.modalExperience}>{judge.experience}</Text>
            <Text style={styles.modalDesc}>Professional dance expert with years of dedication to preserving classical art forms through mentorship and performance.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB', marginVertical: 8 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  info: { flex: 1 },
  label: { fontSize: 10, color: '#6B7280', fontWeight: '500' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  title: { fontSize: 12, color: '#4B5563' },
  experience: { fontSize: 11, color: '#9CA3AF' },
  videoBtn: { alignItems: 'center', justifyContent: 'center', paddingLeft: 8 },
  playIconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E6F4F2', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  playIcon: { color: '#005F56', fontSize: 14, marginLeft: 2 },
  videoText: { fontSize: 10, color: '#4B5563', fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  modalName: { fontSize: 20, fontWeight: 'bold' },
  modalTitle: { fontSize: 14, color: '#4B5563', marginBottom: 4 },
  modalExperience: { fontSize: 13, color: '#9CA3AF', marginBottom: 12 },
  modalDesc: { fontSize: 14, textAlign: 'center', color: '#374151', marginBottom: 20 },
  closeBtn: { backgroundColor: '#005F56', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  closeText: { color: '#FFF', fontWeight: 'bold' },
});
