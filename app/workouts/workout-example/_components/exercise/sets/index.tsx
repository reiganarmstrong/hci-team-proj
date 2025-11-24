"use client";

import type { ActionDispatch } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { ReducerAction } from "..";

type Props = {
	rows: (string[] | (number | boolean)[])[];
	dispatch: ActionDispatch<[action: ReducerAction]>;
};

export default ({ rows, dispatch }: Props) => {
	const RowValToJSX = (val: number | boolean, idx: number, rowIdx: number) => {
		if (idx === 0 || idx === 3) {
			return (
				<div key={Math.random()} className="col-span-1 font-semibold">
					{val}
				</div>
			);
		} else if (idx === 1 || idx === 2) {
			return (
				<div key={Math.random()} className="col-span-1 font-semibold">
					{val}lbs
				</div>
			);
		} else {
			return (
				<div
					key={Math.random()}
					className="flex flex-col items-center justify-center"
				>
					<Checkbox
						className="col-span-1 rounded-none border-2 border-gray-700"
						checked={rows[rowIdx][4] === true}
						onCheckedChange={(e) => {
							dispatch({ type: "edit", rowIdx, value: e.valueOf() === true });
						}}
					/>
				</div>
			);
		}
	};
	return (
		<div className="grid w-full grid-cols-5 gap-3 text-center font-medium">
			{rows[0].map((title) => {
				return (
					<div key={Math.random()} className="col-span-1 text-gray-700">
						{title}
					</div>
				);
			})}
			{rows.slice(1).map((row, rowIdx) => {
				return row.map((value, idx) => {
					return RowValToJSX(value as number | boolean, idx, rowIdx + 1);
				});
			})}
		</div>
	);
};
