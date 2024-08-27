import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HistoryExercise {
  name: string;
  reps: number;
  completedAt: Date; // Assuming you have a date object for completion time
}

interface HistoryCardProps {
  exercise: HistoryExercise;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ exercise }) => {
  const formattedDate = exercise.completedAt.toLocaleDateString(); // Format date for display

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.details}>
        {exercise.reps} Reps - Completed on {formattedDate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'grey',
    marginTop: 8,
  },
});

export default HistoryCard;
