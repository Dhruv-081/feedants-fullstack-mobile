import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ImportantDatesProps {
  dates: {
    registrationDeadline: string;
    submissionStart: string;
    submissionEnd: string;
    resultDate: string;
  };
}

export const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {
  const DateBox = ({ title, date }: { title: string; date: string }) => (
    <View style={styles.dateBox}>
      <Text style={styles.dateLabel}>{title}</Text>
      <Text style={styles.dateVal}>{new Date(date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Important Dates</Text>
      <View style={styles.grid}>
        <DateBox title="Register Before" date={dates.registrationDeadline} />
        <DateBox title="Submission Starts" date={dates.submissionStart} />
        <DateBox title="Submission Ends" date={dates.submissionEnd} />
        <DateBox title="Result Date" date={dates.resultDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginVertical: 8 },
  header: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  dateBox: { width: '48%', backgroundColor: '#F9FAFB', padding: 8, borderRadius: 8, marginBottom: 8 },
  dateLabel: { fontSize: 10, color: '#6B7280' },
  dateVal: { fontSize: 12, fontWeight: 'bold' },
});
