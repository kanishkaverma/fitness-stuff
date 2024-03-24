import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("myDb.sqlite");

export function initDatabase() {
	function initDatabase() {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, exercises TEXT)",
			);
		});

		// Fetch workout history from the database
		// db.transaction((tx) => {
		// 	tx.executeSql("SELECT * FROM workouts", [], (_, { rows }) => {
		// 		setWorkoutHistory(rows._array);
		// 	});
		// });
	}
}
