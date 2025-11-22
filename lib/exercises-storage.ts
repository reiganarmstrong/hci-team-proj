import type { Exercise } from "./types";

// LocalStorage keys
const EXERCISES_KEY = "fitness_app_exercises";
const SELECTED_EXERCISES_KEY = "fitness_app_selected_exercises";

// Get exercises from localStorage
export function getExercisesFromStorage(): Exercise[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(EXERCISES_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Error reading exercises from localStorage:", error);
		return [];
	}
}

// Save exercises to localStorage
export function saveExercisesToStorage(exercises: Exercise[]): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
	} catch (error) {
		console.error("Error saving exercises to localStorage:", error);
	}
}

// Get selected exercise IDs from localStorage
export function getSelectedExercisesFromStorage(): string[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(SELECTED_EXERCISES_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Error reading selected exercises from localStorage:", error);
		return [];
	}
}

// Save selected exercise IDs to localStorage
export function saveSelectedExercisesToStorage(exerciseIds: string[]): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(
			SELECTED_EXERCISES_KEY,
			JSON.stringify(exerciseIds),
		);
	} catch (error) {
		console.error("Error saving selected exercises to localStorage:", error);
	}
}

// Add a custom exercise
export function addCustomExercise(exercise: Exercise): void {
	const exercises = getExercisesFromStorage();
	exercises.push(exercise);
	saveExercisesToStorage(exercises);
}

// Delete a custom exercise
export function deleteCustomExercise(exerciseId: string): void {
	const exercises = getExercisesFromStorage();
	const filtered = exercises.filter((ex) => ex.id !== exerciseId);
	saveExercisesToStorage(filtered);
}

// Get all exercises (sample + custom)
export function getAllExercises(sampleExercises: Exercise[]): Exercise[] {
	const customExercises = getExercisesFromStorage();
	return [...sampleExercises, ...customExercises];
}

