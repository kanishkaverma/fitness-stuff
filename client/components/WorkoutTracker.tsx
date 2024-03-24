import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import Anthropic from "@anthropic-ai/sdk";
import * as SQLite from "expo-sqlite";
import { Why, consultAI } from "../ai_api/anthropic";

interface Exercise {
	name: string;
	sets: number;
	reps: number[] | number;
	weight: string;
}

const WorkoutTracker = () => {
	const [rawText, setRawText] = useState("");
	const [workoutHistory, setWorkoutHistory] = useState([]);
	// 100 grams of strawberries, 2 McDonald’s quarter pounder, 500 grams of pineapple, 50 grams of whey protein 
	useEffect(() => {
	}, []);

	const handleWorkoutSubmit = async () => {
		try {
			const msg = await consultAI(rawText, Why.workout);

			const response = msg.content[0].text;
			console.log(response)
			const exercises: Exercise[] = JSON.parse(response).exercises;

			console.log(exercises);
			setWorkoutHistory(exercises);
			// Save the extracted workout data to the SQLite database
			// db.transaction((tx) => {
			// 	tx.executeSql(
			// 		"INSERT INTO workouts (description, exercises) VALUES (?, ?)",
			// 		[workoutDescription, JSON.stringify(exercises)],
			// 		(_, { insertId }) => {
			// 			console.log("Workout saved with ID:", insertId);
			// 			setWorkoutHistory([
			// 				...workoutHistory,
			// 				{ id: insertId, description: workoutDescription, exercises },
			// 			]);
			// 			setWorkoutDescription("");
			// 		},
			// 		(_, error) => {
			// 			console.log("Error saving workout:", error);
			// 			return true; // Return true to indicate that the error has been handled
			// 		},
			// 	);
			// });
		} catch (error) {
			console.log("Error processing workout:", error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Describe your workout"
				value={rawText}
				onChangeText={setRawText}
			/>
			<Button title="Submit Workout" onPress={handleWorkoutSubmit} />
			<Text style={styles.heading}>Workout History</Text>
			{workoutHistory.map((e, workoutIndex) => (
				<>
					<Text> {e.name} </Text>
					<Text> {e.reps.toString()} </Text>
					{console.log(typeof e.sets)}
					<Text> {Array.isArray(e?.sets) ? e.sets.join("x") : e.sets} </Text>
					<Text> {e.weight} </Text>
				</>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	heading: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	workoutItem: {
		marginBottom: 10,
	},
});
export default WorkoutTracker;
