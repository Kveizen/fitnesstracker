import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BleManager from "react-native-ble-manager"; // Import the BleManager module

interface ExerciseModalProps {
  exerciseName: string;
  totalReps: number;
  onClose: () => void;
}

function arraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exerciseName,
  totalReps,
  onClose,
}) => {
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [currentReps, setCurrentReps] = useState(0);

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    let last_data = [0];
    let should_start_from_zero = true;
    const read_interval = setInterval(() => {
      BleManager.read(
        "D4:8A:FC:A6:AC:DE",
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
      ).then((data) => {
        if (data.length > 0 && !arraysEqual(data, last_data)) {
          setCurrentReps((prevReps) => prevReps + 1);
          last_data = data;
        }
        if (should_start_from_zero) {
          setCurrentReps(0);
          should_start_from_zero = false;
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(read_interval);
    };
  }, []);

  return (
    <View style={styles.modalView}>
      <Text style={styles.exerciseName}>{exerciseName}</Text>
      <Text style={styles.timer}>Time: {timer} seconds</Text>
      <Text style={styles.reps}>
        Reps: {currentReps}/{totalReps}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
  },
  reps: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  // Add additional styles as needed
});

export default ExerciseModal;
