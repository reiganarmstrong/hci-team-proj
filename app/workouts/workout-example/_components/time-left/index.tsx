"use client";
import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const convertSecondsToMinutesAndSeconds = (totalSeconds: number) => {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	return {
		minutes: minutes,
		seconds: seconds,
		formattedTime: `${formattedMinutes}:${formattedSeconds}`,
	};
};

const TIMER_STORAGE_KEY = "fitness_app_timer_state";
const INITIAL_TIME = 600; // 10 minutes

// Load timer state from localStorage
const getStoredTimerState = () => {
	if (typeof window === "undefined") {
		return { time: INITIAL_TIME, running: true };
	}
	
	try {
		const stored = localStorage.getItem(TIMER_STORAGE_KEY);
		if (stored) {
			const { time, running } = JSON.parse(stored);
			return { time, running };
		}
	} catch (e) {
		console.error("Error loading timer state:", e);
	}
	
	return { time: INITIAL_TIME, running: true };
};

export default () => {
	// Use lazy initialization to load from localStorage immediately
	const [timeLeft, setTimeLeft] = useState(() => getStoredTimerState().time);
	const [isRunning, setIsRunning] = useState(() => getStoredTimerState().running);

	// Save timer state to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(
				TIMER_STORAGE_KEY,
				JSON.stringify({ time: timeLeft, running: isRunning })
			);
		}
	}, [timeLeft, isRunning]);

	// Timer countdown
	useEffect(() => {
		if (!isRunning || timeLeft <= 0) return;
		
		const interval = setInterval(() => {
			setTimeLeft((val) => {
				if (val <= 1) {
					setIsRunning(false);
					return 0;
				}
				return val - 1;
			});
		}, 1000);
		
		return () => clearInterval(interval);
	}, [isRunning, timeLeft]);

	const handlePlayPause = () => {
		if (timeLeft <= 0) {
			setTimeLeft(INITIAL_TIME);
			setIsRunning(true);
		} else {
			setIsRunning(!isRunning);
		}
	};

	const handleReset = () => {
		setTimeLeft(INITIAL_TIME);
		setIsRunning(false); // Pause after reset
	};

	const handleAddTime = () => {
		setTimeLeft((prev) => prev + 60); // Add 1 minute
	};

	const handleSubtractTime = () => {
		setTimeLeft((prev) => Math.max(0, prev - 60)); // Subtract 1 minute, min 0
	};

	return (
		<div className="flex flex-col items-center gap-3" suppressHydrationWarning>
			<span className={`font-mono text-4xl font-bold ${timeLeft === 0 ? "text-red-500" : ""}`} suppressHydrationWarning>
				{convertSecondsToMinutesAndSeconds(timeLeft).formattedTime}
			</span>
			<div className="flex items-center gap-2">
				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={handleSubtractTime}
					disabled={timeLeft === 0}
				>
					<Minus size={16} />
				</Button>
				<Button
					type="button"
					size="sm"
					onClick={handlePlayPause}
				>
					{isRunning ? <Pause size={16} /> : <Play size={16} />}
				</Button>
				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={handleReset}
				>
					<RotateCcw size={16} />
				</Button>
				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={handleAddTime}
				>
					<Plus size={16} />
				</Button>
			</div>
		</div>
	);
};
