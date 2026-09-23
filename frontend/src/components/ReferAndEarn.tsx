import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';

export const ReferAndEarn = () => {
  const referralLink = 'https://feedants.com/r/referral123';

  const handleCopy = async () => {
    try {
      await Share.share({ message: `Join this amazing competition using my referral link: ${referralLink}` });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>📢 Refer & Earn more discount</Text>
      <View style={styles.linkBox}>
        <Text style={styles.linkText} numberOfLines={1}>{referralLink}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyText}>Share / Copy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>You earn ₹10 for every signup</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#E6F4F2', padding: 12, borderRadius: 12, marginTop: 16, borderWidth: 1, borderColor: '#B2DFDB' },
  header: { fontSize: 13, fontWeight: 'bold', color: '#005F56', marginBottom: 8 },
  linkBox: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 8, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#CCC' },
  linkText: { flex: 1, fontSize: 12, color: '#333' },
  copyBtn: { backgroundColor: '#005F56', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  copyText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  footer: { fontSize: 11, color: '#005F56', marginTop: 6, fontWeight: '500' },
});
