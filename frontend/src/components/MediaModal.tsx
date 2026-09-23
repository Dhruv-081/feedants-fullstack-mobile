import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MediaModalProps {
  visible: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({ visible, onClose, videoUrl }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>🎥 Video Preview</Text>
          <View style={styles.videoPlayerBox}>
            <Text style={styles.videoUrlText}>Playing from: {videoUrl}</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  content: { width: '90%', backgroundColor: '#FFF', borderRadius: 12, padding: 16, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#111827' },
  videoPlayerBox: { width: '100%', height: 200, backgroundColor: '#000', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16, padding: 10 },
  videoUrlText: { color: '#FFF', fontSize: 12, textAlign: 'center' },
  closeBtn: { backgroundColor: '#005F56', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  closeText: { color: '#FFF', fontWeight: 'bold' },
});
