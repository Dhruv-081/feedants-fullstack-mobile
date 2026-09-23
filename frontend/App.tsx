import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert, TextInput, Modal, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Header } from './src/components/Header';
import { CountdownTimer } from './src/components/CountdownTimer';
import { JudgeCard } from './src/components/JudgeCard';
import { ReferAndEarn } from './src/components/ReferAndEarn';
import { MediaModal } from './src/components/MediaModal';
import { BottomTabBar } from './src/components/BottomTabBar';
import { ImportantDates } from './src/components/ImportantDates';
import { PreviousWinners } from './src/components/PreviousWinners';

import { HomeScreen } from './src/screens/HomeScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { CompetitionsScreen } from './src/screens/CompetitionsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

import { getCompetitionDetails, getMyStatus, registerCompetition, submitEntry } from './src/services/api';
import { translations } from './src/utils/i18n';
import { Trophy, ArrowLeft, Play, Shield, Info, Copy } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Competitions');
  const [showDetail, setShowDetail] = useState(false);

  const [competition, setCompetition] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [activeCompTab, setActiveCompTab] = useState<'about' | 'judging' | 'rules'>('about');
  const [lang, setLang] = useState<'ENG' | 'HIN'>('ENG');

  const [modalVisible, setModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const competitionId = '66f0a6d0c9f8a3c0b0a0a0a0';
  const userId = 'user_demo_123';
  const t = translations[lang];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const comp = await getCompetitionDetails(competitionId);
      setCompetition(comp);
      const stat = await getMyStatus(competitionId, userId);
      setStatus(stat);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await registerCompetition(competitionId, { userId });
      Alert.alert('Success', 'Registered successfully!');
      loadData();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Registration failed');
    }
  };

  const handleSubmission = async () => {
    if (!videoUrl) {
      Alert.alert('Error', 'Please enter a video URL');
      return;
    }
    try {
      await submitEntry(competitionId, { userId, videoUrl });
      Alert.alert('Success', 'Submission uploaded successfully!');
      setModalVisible(false);
      loadData();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Submission failed');
    }
  };

  const playVideo = (url: string) => {
    setCurrentVideoUrl(url);
    setVideoModalVisible(true);
  };

  const renderScreen = () => {
    if (showDetail) {
      return renderObjectivePage();
    }
    switch (activeTab) {
      case 'Home': return <HomeScreen onCompClick={() => setShowDetail(true)} />;
      case 'Explore': return <ExploreScreen onCompClick={() => setShowDetail(true)} />;
      case 'Competitions': return <CompetitionsScreen onCompClick={() => setShowDetail(true)} />;
      case 'Profile': return <ProfileScreen />;
      default: return <HomeScreen onCompClick={() => setShowDetail(true)} />;
    }
  };

  const renderObjectivePage = () => {
    if (!competition) return <Text style={styles.loadingText}>Loading...</Text>;

    const spotsLeft = competition.totalSpots - competition.bookedSpots;
    const progressPercent = (competition.bookedSpots / competition.totalSpots) * 100;
    const isRegistered = competition.isRegistered || status?.registered;

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top bar with back button & language toggle */}
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setShowDetail(false)}>
            <ArrowLeft size={16} color="#008080" />
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>
          <View style={styles.langToggle}>
            <TouchableOpacity onPress={() => setLang('ENG')} style={[styles.langOpt, lang === 'ENG' && styles.langActive]}>
              <Text style={[styles.langText, lang === 'ENG' && styles.langTextActive]}>ENG</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLang('HIN')} style={[styles.langOpt, lang === 'HIN' && styles.langActive]}>
              <Text style={[styles.langText, lang === 'HIN' && styles.langTextActive]}>हिंदी</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title & Tags */}
        <View style={styles.headerCard}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{competition.title}</Text>
            <View style={styles.registeredBadge}>
              <Text style={styles.registeredText}>✓ Registered</Text>
            </View>
          </View>
          <View style={styles.badgeRow}>
            {competition.tags?.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>
          <Text style={styles.certText}>🏆 {competition.winnersCertificateNote}</Text>

          {/* Pricing & Spots Section */}
          <View style={styles.priceSpotCard}>
            <View style={styles.priceCol}>
              <Text style={styles.priceLabel}>Prize Pool</Text>
              <Text style={styles.priceValue}>₹ {competition.prizePool}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceCol}>
              <Text style={styles.priceLabel}>Entry Fee</Text>
              <Text style={styles.priceValue}>₹ {competition.entryFee}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceCol}>
              <Text style={styles.spotsLeftText}>Only {spotsLeft} spots left</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.bookedText}>{competition.bookedSpots} / {competition.totalSpots} Booked</Text>
            </View>
          </View>
        </View>

        {/* Countdown */}
        <CountdownTimer targetDate={competition.lifecycle.registrationDeadline} />

        {/* Judge Card */}
        <JudgeCard judge={competition.judge} onPlayVideo={() => playVideo(competition.judge.introVideoUrl)} />

        {/* Important Dates */}
        <ImportantDates dates={competition.lifecycle} />

        {/* Previous Winners */}
        <PreviousWinners winners={competition.previousWinners} onPlayWinner={playVideo} />

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setActiveCompTab('about')} style={[styles.tabBtn, activeCompTab === 'about' && styles.activeTab]}>
            <Text style={[styles.tabText, activeCompTab === 'about' && styles.activeTabText]}>{t.aboutTab}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveCompTab('judging')} style={[styles.tabBtn, activeCompTab === 'judging' && styles.activeTab]}>
            <Text style={[styles.tabText, activeCompTab === 'judging' && styles.activeTabText]}>{t.judgingTab}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveCompTab('rules')} style={[styles.tabBtn, activeCompTab === 'rules' && styles.activeTab]}>
            <Text style={[styles.tabText, activeCompTab === 'rules' && styles.activeTabText]}>{t.rulesTab}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContentCard}>
          <Text style={styles.tabContentText}>
            {activeCompTab === 'about' && competition.tabs.aboutText}
            {activeCompTab === 'judging' && competition.tabs.judgingParametersText}
            {activeCompTab === 'rules' && competition.tabs.rulesAndEligibilityText}
          </Text>
        </View>

        {/* Rewards */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Rewards (All Positions)</Text>
          {competition.rewards?.map((reward: any, idx: number) => (
            <View key={idx} style={styles.rewardRow}>
              <Text style={styles.rewardPos}>🏆 {reward.position}</Text>
              <Text style={styles.rewardAmt}>₹ {reward.rewardAmount}</Text>
            </View>
          ))}
        </View>

        {/* Refer & Earn */}
        <ReferAndEarn />

        {/* Bottom Dynamic Action Button */}
        {!isRegistered ? (
          <TouchableOpacity style={styles.actionBtn} onPress={handleRegister}>
            <Text style={styles.actionBtnText}>{t.register}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionBtn, styles.registeredBtn]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.actionBtnText}>{t.submission} (Registered ✓)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {!showDetail && (
        <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Submission Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Your Submission</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Video URL (e.g. YouTube/Drive)"
              placeholderTextColor="#9CA3AF"
              value={videoUrl}
              onChangeText={setVideoUrl}
            />
            <TouchableOpacity style={styles.actionBtn} onPress={handleSubmission}>
              <Text style={styles.actionBtnText}>Submit Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Media Video Modal */}
      <MediaModal
        visible={videoModalVisible}
        videoUrl={currentVideoUrl}
        onClose={() => setVideoModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  scrollContainer: { padding: 16, paddingBottom: 100 },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backText: { color: '#008080', fontWeight: 'bold', fontSize: 14 },
  langToggle: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 999, padding: 2 },
  langOpt: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  langActive: { backgroundColor: '#008080' },
  langText: { fontSize: 10, fontWeight: 'bold', color: '#64748B' },
  langTextActive: { color: '#FFFFFF' },
  headerCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', flex: 1 },
  registeredBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  registeredText: { fontSize: 10, color: '#15803D', fontWeight: 'bold' },
  badgeRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  certText: { fontSize: 12, color: '#D97706', fontWeight: 'bold', fontStyle: 'italic', marginBottom: 16 },
  priceSpotCard: { flexDirection: 'row', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'space-between' },
  priceCol: { flex: 1, alignItems: 'center' },
  divider: { width: 1, height: '80%', backgroundColor: '#E2E8F0' },
  priceLabel: { fontSize: 10, color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' },
  priceValue: { fontSize: 16, fontWeight: 'bold', color: '#008080' },
  spotsLeftText: { fontSize: 10, fontWeight: 'bold', color: '#EF4444', marginBottom: 4 },
  progressBarBg: { width: '80%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#008080' },
  bookedText: { fontSize: 9, color: '#94A3B8', marginTop: 2 },
  sectionContainer: { marginTop: 16, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  tabsRow: { flexDirection: 'row', marginTop: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#008080' },
  tabText: { fontSize: 11, color: '#64748B' },
  activeTabText: { color: '#008080', fontWeight: 'bold' },
  tabContentCard: { backgroundColor: '#FFFFFF', padding: 12, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderWidth: 1, borderTopWidth: 0, borderColor: '#E2E8F0' },
  tabContentText: { fontSize: 12, color: '#334155', lineHeight: 18 },
  rewardRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rewardPos: { fontSize: 12, color: '#334155' },
  rewardAmt: { fontSize: 12, fontWeight: 'bold', color: '#008080' },
  actionBtn: { backgroundColor: '#008080', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  registeredBtn: { backgroundColor: '#008080' },
  actionBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#0F172A' },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, marginBottom: 16, fontSize: 14, color: '#0F172A' },
  cancelBtn: { marginTop: 10, alignItems: 'center' },
  cancelText: { color: '#64748B', fontWeight: '500' },
});
