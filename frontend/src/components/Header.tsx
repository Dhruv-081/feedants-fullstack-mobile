import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { translations } from '../utils/i18n';

interface HeaderProps {
  onBack?: () => void;
  lang: 'ENG' | 'HIN';
  setLang: (l: 'ENG' | 'HIN') => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack, lang, setLang }) => {
  const t = translations[lang];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>{t.back}</Text>
      </TouchableOpacity>

      <View style={styles.langContainer}>
        <TouchableOpacity
          style={[styles.langBtn, lang === 'ENG' && styles.langBtnActive]}
          onPress={() => setLang('ENG')}
        >
          <Text style={[styles.langText, lang === 'ENG' && styles.langTextActive]}>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBtn, lang === 'HIN' && styles.langBtnActive]}
          onPress={() => setLang('HIN')}
        >
          <Text style={[styles.langText, lang === 'HIN' && styles.langTextActive]}>हिंदी</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  langContainer: { flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 20, padding: 2 },
  langBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 18 },
  langBtnActive: { backgroundColor: '#005F56' },
  langText: { fontSize: 12, color: '#4B5563', fontWeight: '500' },
  langTextActive: { color: '#FFFFFF' },
});
