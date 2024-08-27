import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import HistoryCard from '../../components/HistoryCard'; // Import your HistoryCard component

interface HistoryExercise {
  name: string;
  reps: number;
  completedAt: Date;
}
 
const HistoryScreen = () => {
  const [exercises, setExercises] = useState<HistoryExercise[]>([]);

  // Assuming you have a way to fetch completed exercises (replace with your logic)
  useEffect(() => {
    const fetchExercises = async () => {
      // Replace with your logic to fetch completed exercises
      const fetchedExercises = [
        { name: 'Push-ups', reps: 10, completedAt: new Date() },
      ];
      setExercises(fetchedExercises);
    };

    fetchExercises();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <HistoryCard key={exercise.name} exercise={exercise} />
          ))
        ) : (
          <Text style={styles.noDataText}>No completed exercises yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

export default HistoryScreen;
