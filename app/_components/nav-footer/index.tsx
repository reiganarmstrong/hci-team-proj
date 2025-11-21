"use client";

import homeIconPathName from "@/public/figma/Home_Icon.png";
import personIconPathName from "@/public/figma/Person_Icon.png";
import waveIconPathName from "@/public/figma/Wave_Icon.png";
import NavButton from "./nav-button";
export default () => {
	return (
		<div className="fixed right-0 bottom-0 left-0 z-50 flex h-fit flex-row items-center justify-center gap-6 bg-primary">
			<NavButton
				src={homeIconPathName}
				alt="navigate to home"
				text="Home"
				linkPath="/"
			/>
			<NavButton
				src={waveIconPathName}
				alt="navigate to workouts"
				text="Workouts"
				linkPath="/workouts"
			/>
			<NavButton
				src={personIconPathName}
				alt="navigate to profile"
				text="Profile"
				linkPath="/profile"
			/>
		</div>
	);
};
