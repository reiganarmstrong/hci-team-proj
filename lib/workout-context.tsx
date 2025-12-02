"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WorkoutContextType {
	hasActiveWorkout: boolean;
	setHasActiveWorkout: (active: boolean) => void;
	pendingNavigation: string | null;
	setPendingNavigation: (path: string | null) => void;
	showWorkoutDialog: boolean;
	setShowWorkoutDialog: (show: boolean) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
	const [hasActiveWorkout, setHasActiveWorkout] = useState(false);
	const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
	const [showWorkoutDialog, setShowWorkoutDialog] = useState(false);

	return (
		<WorkoutContext.Provider
			value={{
				hasActiveWorkout,
				setHasActiveWorkout,
				pendingNavigation,
				setPendingNavigation,
				showWorkoutDialog,
				setShowWorkoutDialog,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
}

export function useWorkout() {
	const context = useContext(WorkoutContext);
	if (context === undefined) {
		throw new Error("useWorkout must be used within a WorkoutProvider");
	}
	return context;
}

