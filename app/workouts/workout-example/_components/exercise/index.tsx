"use client";
import { Dumbbell, Plus, Minus } from "lucide-react";
import { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExerciseHeader, { type ExerciseHeaderProps } from "./exercise-header";
import Sets from "./sets";

type AddSetAction = {
	type: "add";
};

type RemoveSetAction = {
	type: "remove";
};

type EditCheckBoxState = {
	type: "edit";
	rowIdx: number;
	value: boolean;
};

type EditValueAction = {
	type: "editValue";
	rowIdx: number;
	colIdx: number;
	value: number;
};

export type ReducerAction = AddSetAction | RemoveSetAction | EditCheckBoxState | EditValueAction;
const setDataReducer = (
	prev: (string[] | (number | boolean)[])[],
	action: ReducerAction,
) => {
	if (action.type === "edit") {
		prev[action.rowIdx][4] = action.value;
		return [...prev];
	} else if (action.type === "editValue") {
		prev[action.rowIdx][action.colIdx] = action.value;
		return [...prev];
	} else if (action.type === "remove") {
		// Can't remove if only header + 1 set remain
		if (prev.length <= 2) return prev;
		
		const newData: (string[] | (number | boolean)[])[] = [];
		prev.forEach((arr, idx) => {
			if (idx === 0) {
				newData.push([...(arr as string[])]);
			} else if (idx < prev.length - 1) {
				// Copy all but the last set
				newData.push([...(arr as (number | boolean)[])]);
			}
		});
		return newData;
	} else {
		// add
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
		["SET", "BEST (lbs)", "WEIGHT (lbs)", "REPS", "DONE"],
		[1, 155, 155, 5, false],
		[2, 155, 155, 5, false],
		[3, 155, 135, 5, false],
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
				<div className="flex w-full max-w-lg flex-col gap-2">
					<Button
						type="button"
						className="w-full"
						onClick={() => setDataDispatch({ type: "add" })}
					>
						<Plus />
						Add Set
					</Button>
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() => setDataDispatch({ type: "remove" })}
						disabled={setData.length <= 2}
					>
						<Minus />
						Remove Set
					</Button>
				</div>
			</div>
		</Card>
	);
};
