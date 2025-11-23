"use client";
import { Dumbbell, Plus } from "lucide-react";
import { useReducer, useState } from "react";
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

type AddSetAction = {
	type: "add";
};

type EditCheckBoxState = {
	type: "edit";
	rowIdx: number;
	value: boolean;
};

export type ReducerAction = AddSetAction | EditCheckBoxState;
const setDataReducer = (
	prev: (string[] | (number | boolean)[])[],
	action: ReducerAction,
) => {
	if (action.type === "edit") {
		prev[action.rowIdx][4] = action.value;
		return [...prev];
	} else {
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
		newData[newData.length - 1][4] = false;
		return newData;
	}
};
type Props = ExerciseHeaderProps;
export default ({ nameText, restText, toolTipText }: Props) => {
	const [setData, setDataDispatch] = useReducer(setDataReducer, [
		...DefaultSetData,
	]);
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
				<Sets rows={setData} dispatch={setDataDispatch} />
				<Button
					type="button"
					className="w-full max-w-lg"
					onClick={() => setDataDispatch({ type: "add" })}
				>
					<Plus />
					Add Set
				</Button>
			</div>
		</Card>
	);
};
