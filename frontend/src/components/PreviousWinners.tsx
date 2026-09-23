import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

interface WinnersProps {
  winners: { name: string; position: string; videoThumbnail: string; videoUrl: string }[];
  onPlayWinner: (url: string) => void;
}

export const PreviousWinners: React.FC<WinnersProps> = ({ winners, onPlayWinner }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Previous Winners</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {winners?.map((w, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={() => onPlayWinner(w.videoUrl)}>
            <Image source={{ uri: w.videoThumbnail }} style={styles.thumb} />
            <View style={styles.playBadge}><Text style={styles.playText}>▶</Text></View>
            <Text style={styles.name} numberOfLines={1}>{w.name}</Text>
            <Text style={styles.pos}>{w.position}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginVertical: 8 },
  header: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  card: { width: 90, marginRight: 10, alignItems: 'center' },
  thumb: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#EEE' },
  playBadge: { position: 'absolute', top: 35, left: 35, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  playText: { color: '#FFF', fontSize: 10, marginLeft: 2 },
  name: { fontSize: 11, fontWeight: 'bold', marginTop: 4, textAlign: 'center' },
  pos: { fontSize: 10, color: '#6B7280' },
});
