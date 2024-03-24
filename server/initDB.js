import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// Authenticate with the admin email and password
await pb.admins.authWithPassword("kanisverma@gmail.com", "Kanishkarox1!");

const users = await pb.collections.getFirstListItem("users");

// Create the "users" collection
// const users = await pb.collections.create({
// 	name: "users",
// 	type: "auth",
// 	schema: [
// 		{ name: "username", type: "text", required: true, unique: true },
// 		{ name: "email", type: "email", required: true, unique: true },
// 		{ name: "created_at", type: "date", default: "now()" },
// 	],
// 	options: {
// 		allowOAuth2Auth: true,
// 		requireEmail: true,
// 	},
// });

// Create the "workouts" collection
const workouts = await pb.collections.create({
	name: "workouts",
	type: "base",
	schema: [
		{ name: "name", type: "text", required: true },
		{ name: "description", type: "text" },
		{ name: "created_at", type: "date", default: "now()" },
		{ name: "user", type: "relation", collectionId: users.id, required: true },
	],
});

// Create the "exercises" collection
const exercises = await pb.collections.create({
	name: "exercises",
	type: "base",
	schema: [
		{ name: "name", type: "text", required: true },
		{ name: "description", type: "text" },
		{ name: "target_muscle", type: "text" },
		{ name: "equipment", type: "text" },
	],
});

// Create the "workout_exercises" collection
const workoutExercises = await pb.collections.create({
	name: "workout_exercises",
	type: "base",
	schema: [
		{ name: "sets", type: "number" },
		{ name: "reps", type: "number" },
		{ name: "weight", type: "number" },
		{ name: "duration", type: "number" },
		{ name: "rest_time", type: "number" },
		{ name: "sequence", type: "number" },
		{
			name: "workout",
			type: "relation",
			collectionId: workouts.id,
			required: true,
		},
		{
			name: "exercise",
			type: "relation",
			collectionId: exercises.id,
			required: true,
		},
	],
});

// Create the "user_workouts" collection
const userWorkouts = await pb.collections.create({
	name: "user_workouts",
	type: "base",
	schema: [
		{ name: "completed_at", type: "date" },
		{ name: "user", type: "relation", collectionId: users.id, required: true },
		{
			name: "workout",
			type: "relation",
			collectionId: workouts.id,
			required: true,
		},
	],
});

// Create the "workout_notes" collection
const workoutNotes = await pb.collections.create({
	name: "workout_notes",
	type: "base",
	schema: [
		{ name: "note", type: "text" },
		{ name: "created_at", type: "date", default: "now()" },
		{
			name: "user_workout",
			type: "relation",
			collectionId: userWorkouts.id,
			required: true,
		},
	],
});

// Create the "user_preferences" collection
const userPreferences = await pb.collections.create({
	name: "user_preferences",
	type: "base",
	schema: [
		{ name: "preference_key", type: "text", required: true },
		{ name: "preference_value", type: "text" },
		{ name: "user", type: "relation", collectionId: users.id, required: true },
	],
});

// Create the "progress_tracking" collection
const progressTracking = await pb.collections.create({
	name: "progress_tracking",
	type: "base",
	schema: [
		{ name: "workout_date", type: "date" },
		{ name: "sets", type: "number" },
		{ name: "reps", type: "number" },
		{ name: "weight", type: "number" },
		{ name: "duration", type: "number" },
		{ name: "user", type: "relation", collectionId: users.id, required: true },
		{
			name: "exercise",
			type: "relation",
			collectionId: exercises.id,
			required: true,
		},
	],
});

console.log("Collections created successfully!");
