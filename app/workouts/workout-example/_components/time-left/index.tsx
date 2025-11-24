"use client";
import { useEffect, useState } from "react";

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

export default () => {
	const [timeLeft, setTimeLeft] = useState(600);
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((val) => val - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<span>{convertSecondsToMinutesAndSeconds(timeLeft).formattedTime}</span>
	);
};
