"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useWorkout } from "@/lib/workout-context";
import { calculateWorkoutExp, addExp } from "@/lib/exp-system";
import { 
	getWorkoutExercisesFromStorage,
	clearWorkoutExercises 
} from "@/lib/exercises-storage";
import { ExpNotification } from "./exp-notification";

export function WorkoutNavigationDialog() {
	const router = useRouter();
	const { 
		showWorkoutDialog, 
		setShowWorkoutDialog, 
		pendingNavigation,
		setPendingNavigation,
		setHasActiveWorkout 
	} = useWorkout();

	const [showExpNotification, setShowExpNotification] = useState(false);
	const [expData, setExpData] = useState({ 
		expGained: 0, 
		leveledUp: false, 
		newLevel: 0, 
		levelsGained: 0 
	});

	useEffect(() => {
		if (showWorkoutDialog) {
			// Prevent body scroll when dialog is open
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = "unset";
			};
		}
	}, [showWorkoutDialog]);

	const handleFinish = () => {
		// Calculate and award EXP
		const workoutExercises = getWorkoutExercisesFromStorage();
		const exerciseCount = workoutExercises.length;
		const estimatedSets = exerciseCount * 3;
		const expGained = calculateWorkoutExp(exerciseCount, estimatedSets);
		const result = addExp(expGained);

		// Clear workout and timer
		clearWorkoutExercises();
		if (typeof window !== "undefined") {
			localStorage.removeItem("fitness_app_timer_state");
		}

		// Update state
		setHasActiveWorkout(false);
		setShowWorkoutDialog(false);

		// Show EXP notification
		setExpData({
			expGained,
			leveledUp: result.leveledUp,
			newLevel: result.newLevel,
			levelsGained: result.levelsGained,
		});
		setShowExpNotification(true);
	};

	const handleCloseExpNotification = () => {
		setShowExpNotification(false);
		// Navigate after closing EXP notification
		if (pendingNavigation) {
			router.push(pendingNavigation);
			setPendingNavigation(null);
		}
	};

	const handleDelete = () => {
		// Clear workout and timer without EXP
		clearWorkoutExercises();
		if (typeof window !== "undefined") {
			localStorage.removeItem("fitness_app_timer_state");
		}

		// Update state and navigate
		setHasActiveWorkout(false);
		setShowWorkoutDialog(false);
		
		if (pendingNavigation) {
			router.push(pendingNavigation);
			setPendingNavigation(null);
		}
	};

	const handleContinue = () => {
		// Just close dialog and stay on workout page
		setShowWorkoutDialog(false);
		setPendingNavigation(null);
	};

	if (!showWorkoutDialog && !showExpNotification) return null;

	return (
		<>
			{/* Workout Dialog */}
			{showWorkoutDialog && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-200"
						onClick={handleContinue}
					/>

					{/* Dialog */}
					<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
						<div className="pointer-events-auto relative w-full max-w-md transform rounded-2xl bg-background p-6 shadow-2xl">
							{/* Warning Icon */}
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
									<AlertTriangle size={40} className="text-orange-600" />
								</div>
							</div>

							{/* Title */}
							<h2 className="mb-2 text-center font-bold text-2xl">
								Workout in Progress
							</h2>

							{/* Description */}
							<p className="mb-6 text-center text-muted-foreground">
								You have an active workout. What would you like to do?
							</p>

							{/* Action Buttons */}
							<div className="flex flex-col gap-3">
								{/* Finish Button */}
								<button
									type="button"
									onClick={handleFinish}
									className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
								>
									Finish Workout
									<span className="block text-xs opacity-90">Award EXP and complete</span>
								</button>

								{/* Delete Button */}
								<button
									type="button"
									onClick={handleDelete}
									className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
								>
									Delete Workout
									<span className="block text-xs opacity-90">Discard without EXP</span>
								</button>

								{/* Continue Button */}
								<button
									type="button"
									onClick={handleContinue}
									className="w-full rounded-lg border-2 border-foreground bg-background py-3 font-semibold text-foreground transition-colors hover:bg-muted"
								>
									Continue Workout
								</button>
							</div>
						</div>
					</div>
				</>
			)}

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
}

