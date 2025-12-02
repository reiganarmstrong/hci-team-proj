"use client";
import { ChevronLeft, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Exercise from "./_components/exercise";
import TimeLeft from "./_components/time-left";
import { ExpNotification } from "@/components/ui/exp-notification";
import { SAMPLE_EXERCISES } from "@/lib/exercises-data";
import { 
	getAllExercises, 
	getSelectedExercisesFromStorage, 
	saveSelectedExercisesToStorage,
	getWorkoutExercisesFromStorage,
	saveWorkoutExercisesToStorage,
	clearWorkoutExercises
} from "@/lib/exercises-storage";
import { calculateWorkoutExp, addExp } from "@/lib/exp-system";
import { useWorkout } from "@/lib/workout-context";
import type { Exercise as ExerciseType } from "@/lib/types";

// Preset exercises for demo workouts
const PRESET_EXERCISES = [
	"bench-press",
	"overhead-press",
	"dumbbell-curl",
	"lateral-raise"
];

export default () => {
	const [workoutExercises, setWorkoutExercises] = useState<ExerciseType[]>([]);
	const [showExpNotification, setShowExpNotification] = useState(false);
	const [expData, setExpData] = useState({ expGained: 0, leveledUp: false, newLevel: 0, levelsGained: 0 });
	const searchParams = useSearchParams();
	const router = useRouter();
	const { 
		setHasActiveWorkout, 
		setPendingNavigation, 
		setShowWorkoutDialog 
	} = useWorkout();
	const isPreset = searchParams.get("preset") === "true";

	// Load exercises from localStorage on mount
	useEffect(() => {
		// Check if this is a preset workout from home page
		if (isPreset) {
			// Clear any existing workout and load preset exercises
			clearWorkoutExercises();
			
			const presetExercises = SAMPLE_EXERCISES.filter(ex => 
				PRESET_EXERCISES.includes(ex.id)
			);
			
			setWorkoutExercises(presetExercises);
			saveWorkoutExercisesToStorage(presetExercises);
			
			// Clear the selected exercises storage
			saveSelectedExercisesToStorage([]);
			return;
		}
		
		// First, load existing workout exercises
		const existingWorkout = getWorkoutExercisesFromStorage();
		
		// Then check if there are newly selected exercises to add
		const selectedIds = getSelectedExercisesFromStorage();
		
		if (selectedIds.length > 0) {
			const allExercises = getAllExercises(SAMPLE_EXERCISES);
			const selectedExercises = allExercises.filter(ex => selectedIds.includes(ex.id));
			
			// Get IDs of existing exercises
			const existingIds = new Set(existingWorkout.map(ex => ex.id));
			
			// Filter out duplicates - only add exercises not already in workout
			const newExercises = selectedExercises.filter(ex => !existingIds.has(ex.id));
			
			if (newExercises.length > 0) {
				// Combine existing workout with new selections (no duplicates)
				const updatedWorkout = [...existingWorkout, ...newExercises];
				setWorkoutExercises(updatedWorkout);
				
				// Save the updated workout and clear selections
				saveWorkoutExercisesToStorage(updatedWorkout);
			} else {
				// All selected exercises were duplicates, just load existing
				setWorkoutExercises(existingWorkout);
			}
			
			// Always clear selections
			saveSelectedExercisesToStorage([]);
		} else {
			// Just load existing workout
			setWorkoutExercises(existingWorkout);
		}
	}, [isPreset]);

	// Update active workout status based on exercises
	useEffect(() => {
		setHasActiveWorkout(workoutExercises.length > 0);
	}, [workoutExercises, setHasActiveWorkout]);

	// Save workout exercises whenever they change
	useEffect(() => {
		if (workoutExercises.length > 0) {
			saveWorkoutExercisesToStorage(workoutExercises);
		}
	}, [workoutExercises]);

	const handleFinishWorkout = () => {
		// Calculate EXP (estimate 3 sets per exercise for demo)
		const exerciseCount = workoutExercises.length;
		const estimatedSets = exerciseCount * 3; // Average 3 sets per exercise
		const expGained = calculateWorkoutExp(exerciseCount, estimatedSets);
		
		// Add EXP and check for level up
		const result = addExp(expGained);
		
		// Set EXP data and show notification
		setExpData({
			expGained,
			leveledUp: result.leveledUp,
			newLevel: result.newLevel,
			levelsGained: result.levelsGained,
		});
		setShowExpNotification(true);
		
		// Clear the workout when finishing
		clearWorkoutExercises();
		setHasActiveWorkout(false);
		
		// Clear timer state
		if (typeof window !== "undefined") {
			localStorage.removeItem("fitness_app_timer_state");
		}
	};

	const handleCloseExpNotification = () => {
		setShowExpNotification(false);
		// Navigate to home after closing notification
		router.push("/");
	};

	const handleBackClick = (e: React.MouseEvent) => {
		if (workoutExercises.length > 0) {
			e.preventDefault();
			setHasActiveWorkout(true);
			setPendingNavigation("/workouts");
			setShowWorkoutDialog(true);
		}
	};

	const MemoizedHeading = memo(() => (
		<span className="relative font-bold text-4xl">
			<Link
				href={"/workouts"}
				className="-left-8 -translate-1/2 absolute top-1/2 inline-block h-fit w-fit"
				onClick={handleBackClick}
			>
				<ChevronLeft width={30} height={30} />
			</Link>
			Quick Workout
		</span>
	));
	
	return (
		<>
			<div className="flex w-full flex-col items-center justify-center gap-4 p-8">
				<MemoizedHeading />
				<div className="mb-5 flex w-full flex-col items-center justify-center gap-4">
					<div className="flex w-full flex-col items-center justify-center gap-2 text-gray-500">
						<div className="flex items-center gap-2">
							<Clock />
							<span>Time Left:</span>
						</div>
						<TimeLeft />
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-4">
						{workoutExercises.length > 0 ? (
							workoutExercises.map((exercise) => (
								<Exercise 
									key={exercise.id}
									nameText={exercise.name}
									restText="Rest: 1min 30sec"
									toolTipText={exercise.instructions.map(step => 
										step.endsWith('.') ? step : `${step}.`
									).join(' ')}
								/>
							))
						) : (
							<p className="py-8 text-center text-muted-foreground">
								No exercises added yet. Click "Add Exercise" to get started!
							</p>
						)}
					</div>
				</div>
				<Button
					type="button"
					className="w-full max-w-lg p-4"
					asChild
				>
					<Link href="/workouts/add-exercise">
						<Plus />
						Add Exercise
					</Link>
				</Button>
				<Button
					type="button"
					variant={"ghost"}
					className="w-full max-w-lg border-2 border-foreground p-4"
					onClick={handleFinishWorkout}
				>
					Finish Workout
				</Button>
			</div>

			{/* EXP Notification */}
			<ExpNotification
				isOpen={showExpNotification}
				onClose={handleCloseExpNotification}
				expGained={expData.expGained}
				leveledUp={expData.leveledUp}
				newLevel={expData.newLevel}
				levelsGained={expData.levelsGained}
			/>
		</>
	);
};
