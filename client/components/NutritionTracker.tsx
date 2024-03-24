import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getFoodData } from "../../server/db/database";
import { Why, consultAI } from "../ai_api/anthropic";

interface Food {
	name: string;
	quantity: string;
	unit: string;
	carbohydrates: number;
	protein: number;
	fat: number;
	calories: number;
}

const NutritionTracker = () => {
	const [rawText, setRawText] = useState("");
	const [foodHistory, setFoodHistory] = useState<Food[]>([]);
	const [foodData, setFoodData] = useState([]);
	// 100 grams of strawberries, 2 McDonald’s quarter pounder, 500 grams of pineapple, 50 grams of whey protein
	useEffect(() => {
		// initDatabase();
	}, []);

	const handleSubmit = async () => {
		try {
			const msg = await consultAI(rawText, Why.nutrition);

			const response = msg.content[0].text;
			console.log("response", response);
			const foods: Food[] = JSON.parse(response).foods;

			try {
				// biome-ignore lint/complexity/noForEach: <explanation>
				foods.forEach(async (food) => {
					const foodData = await getFoodData(food?.name);
					console.log(foodData);
				});
			} catch (e) {
				console.log(e);
			}

			setFoodHistory(foods);
		} catch (error) {
			console.log("Error processing workout:", error);
		}
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder="Describe what you ate"
				value={rawText}
				onChangeText={setRawText}
			/>
			<Button title="Submit" onPress={handleSubmit} />
			<Text>Workout History</Text>
			{foodHistory.map((food, workoutIndex) => (
				<View>
					<Text> {food.name} </Text>
					{/* <Text> {food.calories} </Text> */}
					{/* <Text> {food.protein} </Text> */}
					<Text> {food.unit} </Text>
					<Text> {food.quantity} </Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginVertical: 2,
	},
	inputTextStyle: {
		minHeight: 64,
	},
});

export default NutritionTracker;
