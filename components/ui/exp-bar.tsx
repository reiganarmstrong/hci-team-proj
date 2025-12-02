"use client";

import { useEffect, useState, useRef } from "react";
import { Zap } from "lucide-react";
import { getUserProgress } from "@/lib/exp-system";

export function ExpBar() {
	// Initialize with null to avoid hydration mismatch, then load on client
	const [progress, setProgress] = useState<{ level: number; currentExp: number; expToNextLevel: number } | null>(null);
	const isInitialLoad = useRef(true);

	useEffect(() => {
		// Load progress on mount
		const userProgress = getUserProgress();
		setProgress(userProgress);

		// Mark that initial load is complete after a brief delay
		setTimeout(() => {
			isInitialLoad.current = false;
		}, 50);

		// Listen for storage changes (when EXP is gained)
		const handleStorageChange = () => {
			const updatedProgress = getUserProgress();
			setProgress(updatedProgress);
		};

		window.addEventListener("storage", handleStorageChange);
		
		// Also check periodically in case of same-tab updates
		const interval = setInterval(handleStorageChange, 1000);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearInterval(interval);
		};
	}, []);

	// Show loading state while progress is being fetched
	if (!progress) {
		return (
			<div className="w-full max-w-md">
				{/* Level Display Skeleton */}
				<div className="mb-2 flex items-center gap-2">
					<Zap size={20} className="text-yellow-500" />
					<span className="font-semibold text-lg">Level 3</span>
				</div>

				{/* Progress Bar Skeleton - no width to avoid animation */}
				<div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
					<div
						className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
						style={{ width: "0%" }}
					/>
				</div>

				{/* EXP Text Skeleton */}
				<div className="mt-1 text-center text-muted-foreground text-sm">
					250 / 500 EXP
				</div>
			</div>
		);
	}

	const progressPercentage = (progress.currentExp / progress.expToNextLevel) * 100;

	return (
		<div className="w-full max-w-md">
			{/* Level Display */}
			<div className="mb-2 flex items-center gap-2">
				<Zap size={20} className="text-yellow-500" />
				<span className="font-semibold text-lg">Level {progress.level}</span>
			</div>

			{/* Progress Bar */}
			<div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
				<div
					className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ${
						isInitialLoad.current ? "" : "transition-all duration-500 ease-out"
					}`}
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>

			{/* EXP Text */}
			<div className="mt-1 text-center text-muted-foreground text-sm">
				{progress.currentExp} / {progress.expToNextLevel} EXP
			</div>
		</div>
	);
}

