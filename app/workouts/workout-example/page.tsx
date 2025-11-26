"use client";
import { ChevronLeft, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Exercise from "./_components/exercise";
import TimeLeft from "./_components/time-left";
import { SAMPLE_EXERCISES } from "@/lib/exercises-data";
import { 
	getAllExercises, 
	getSelectedExercisesFromStorage, 
	saveSelectedExercisesToStorage,
	getWorkoutExercisesFromStorage,
	saveWorkoutExercisesToStorage,
	clearWorkoutExercises
} from "@/lib/exercises-storage";
import type { Exercise as ExerciseType } from "@/lib/types";

export default () => {
	const [workoutExercises, setWorkoutExercises] = useState<ExerciseType[]>([]);

	// Load exercises from localStorage on mount
	useEffect(() => {
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
	}, []);

	// Save workout exercises whenever they change
	useEffect(() => {
		if (workoutExercises.length > 0) {
			saveWorkoutExercisesToStorage(workoutExercises);
		}
	}, [workoutExercises]);

	const handleFinishWorkout = () => {
		// Clear the workout when finishing
		clearWorkoutExercises();
		// Clear timer state
		if (typeof window !== "undefined") {
			localStorage.removeItem("fitness_app_timer_state");
		}
	};
	const MemoizedHeading = memo(() => (
		<span className="relative font-bold text-4xl">
			<Link
				href={"/workouts"}
				className="-left-8 -translate-1/2 absolute top-1/2 inline-block h-fit w-fit"
			>
				<ChevronLeft width={30} height={30} />
			</Link>
			Quick Workout
		</span>
	));
	
	return (
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
				asChild
			>
				<Link href={"/"} onClick={handleFinishWorkout}>Finish Workout</Link>
			</Button>
		</div>
	);
};
