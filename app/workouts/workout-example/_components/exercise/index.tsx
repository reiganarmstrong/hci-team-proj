"use client";
import { Dumbbell, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExerciseHeader, { type ExerciseHeaderProps } from "./exercise-header";
import Sets from "./sets";

const DefaultSetData = [
	["SET", "BEST", "WEIGHT", "REPS", "DONE"],
	[1, 155, 155, 5, false],
	[2, 155, 155, 5, false],
	[3, 155, 135, 5, false],
];
type Props = ExerciseHeaderProps;
export default ({ nameText, restText, toolTipText }: Props) => {
	const [setData, setSetData] = useState(DefaultSetData);
	const handleSetAddition = () => {
		setSetData((prev) => {
			const newData: (string[] | (number | boolean)[])[] = [];
			prev.forEach((arr, idx) => {
				if (idx === 0) {
					newData.push([...(arr as string[])]);
				} else {
					newData.push([...(arr as (number | boolean)[])]);
				}
			});
			newData.push([...(newData[newData.length - 1] as (number | boolean)[])]);
			(newData[newData.length - 1][0] as number) =
				(newData[newData.length - 1][0] as number) + 1;
			return newData;
		});
	};
	return (
		<Card className="flex w-full flex-col rounded-none bg-figma-dark-grey p-5 lg:w-1/2">
			<div className="flex flex-row items-center justify-between gap-4">
				<Dumbbell />
				<ExerciseHeader
					restText={restText}
					nameText={nameText}
					toolTipText={toolTipText}
				/>
			</div>
			<div className="flex w-full flex-col items-center justify-center gap-8">
				<Sets rows={setData} />
				<Button
					type="button"
					className="w-full max-w-lg"
					onClick={handleSetAddition}
				>
					<Plus />
					Add Set
				</Button>
			</div>
		</Card>
	);
};
