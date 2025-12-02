"use client";
import { useState, useEffect } from "react";
import GoalItem from "./goal-item";

export default () => {
	const getRandInt = () => {
		return Math.floor(Math.random() * 20) + 200;
	};
	// Initialize with a static value to avoid hydration mismatch
	const [minWeight, setMinWeight] = useState(210);
	
	// Update with random value on client side after mount
	useEffect(() => {
		setMinWeight(getRandInt());
	}, []);
	return (
		<div className="flex w-full flex-col items-center justify-center gap-2">
			<div className="w-full text-left font-medium text-xl sm:text-2xl">Goals:</div>
			<div className="flex w-full flex-col gap-3 text-center text-base sm:gap-4 sm:text-xl">
				<GoalItem
					circleContent="1"
					textContent={`${minWeight}lbs on Bench Press`}
				/>
				<GoalItem
					circleContent="2"
					textContent={`${minWeight + 2}lbs on Bench Press`}
				/>
				<GoalItem
					circleContent="3"
					textContent={`${minWeight + 4}lbs  on Bench Press`}
				/>
			</div>
		</div>
	);
};
