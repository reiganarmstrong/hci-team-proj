"use client";
import { useState } from "react";
import GoalItem from "./goal-item";

export default () => {
	const getRandInt = () => {
		return Math.floor(Math.random() * 20) + 200;
	};
	const [minWeight, _setMinWeight] = useState(getRandInt());
	return (
		<div className="flex w-full flex-col items-center justify-center gap-2">
			<div className="w-full text-left font-medium text-2xl">Goals:</div>
			<div className="flex w-full flex-col gap-4 text-center text-xl">
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
