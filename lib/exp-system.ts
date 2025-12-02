// EXP System utilities

const EXP_KEY = "fitness_app_exp";
const LEVEL_KEY = "fitness_app_level";

// Constants for EXP calculation
const EXP_PER_EXERCISE = 50; // Base EXP per exercise
const EXP_PER_SET = 10; // Additional EXP per set

// XP needed for each level (linear progression)
const EXP_PER_LEVEL = 500;

export interface UserProgress {
	level: number;
	currentExp: number;
	expToNextLevel: number;
}

// Initialize user at level 3 with partial progress (demo)
const DEMO_STARTING_LEVEL = 3;
const DEMO_STARTING_EXP = 250; // Halfway through level 3

// Get current user progress
export function getUserProgress(): UserProgress {
	if (typeof window === "undefined") {
		return {
			level: DEMO_STARTING_LEVEL,
			currentExp: DEMO_STARTING_EXP,
			expToNextLevel: EXP_PER_LEVEL,
		};
	}

	try {
		const level = parseInt(localStorage.getItem(LEVEL_KEY) || "0");
		const currentExp = parseInt(localStorage.getItem(EXP_KEY) || "0");

		// Initialize if not set
		if (level === 0) {
			localStorage.setItem(LEVEL_KEY, DEMO_STARTING_LEVEL.toString());
			localStorage.setItem(EXP_KEY, DEMO_STARTING_EXP.toString());
			return {
				level: DEMO_STARTING_LEVEL,
				currentExp: DEMO_STARTING_EXP,
				expToNextLevel: EXP_PER_LEVEL,
			};
		}

		return {
			level,
			currentExp,
			expToNextLevel: EXP_PER_LEVEL,
		};
	} catch (error) {
		console.error("Error reading user progress:", error);
		return {
			level: DEMO_STARTING_LEVEL,
			currentExp: DEMO_STARTING_EXP,
			expToNextLevel: EXP_PER_LEVEL,
		};
	}
}

// Calculate EXP from workout
export function calculateWorkoutExp(exerciseCount: number, totalSets: number): number {
	return EXP_PER_EXERCISE * exerciseCount + EXP_PER_SET * totalSets;
}

// Add EXP and handle level ups
export function addExp(expGained: number): {
	newLevel: number;
	newExp: number;
	leveledUp: boolean;
	levelsGained: number;
} {
	if (typeof window === "undefined") {
		return { newLevel: 0, newExp: 0, leveledUp: false, levelsGained: 0 };
	}

	try {
		const { level, currentExp } = getUserProgress();
		let newExp = currentExp + expGained;
		let newLevel = level;
		let levelsGained = 0;

		// Handle level ups
		while (newExp >= EXP_PER_LEVEL) {
			newExp -= EXP_PER_LEVEL;
			newLevel++;
			levelsGained++;
		}

		// Save to localStorage
		localStorage.setItem(LEVEL_KEY, newLevel.toString());
		localStorage.setItem(EXP_KEY, newExp.toString());

		return {
			newLevel,
			newExp,
			leveledUp: levelsGained > 0,
			levelsGained,
		};
	} catch (error) {
		console.error("Error adding EXP:", error);
		return { newLevel: 0, newExp: 0, leveledUp: false, levelsGained: 0 };
	}
}

// Reset progress (for testing)
export function resetProgress(): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(LEVEL_KEY, DEMO_STARTING_LEVEL.toString());
		localStorage.setItem(EXP_KEY, DEMO_STARTING_EXP.toString());
	} catch (error) {
		console.error("Error resetting progress:", error);
	}
}

