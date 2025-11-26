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
		if (idx === 0) {
			// SET number - not editable
			return (
				<div key={`${rowIdx}-${idx}`} className="col-span-1 font-semibold">
					{val}
				</div>
			);
		} else if (idx === 1) {
			// BEST - not editable
			return (
				<div key={`${rowIdx}-${idx}`} className="col-span-1 font-semibold">
					{val}
				</div>
			);
		} else if (idx === 2) {
			// WEIGHT - editable
			return (
				<div key={`${rowIdx}-${idx}`} className="col-span-1 font-semibold">
					<input
						type="text"
						inputMode="numeric"
						value={val as number}
						onChange={(e) => {
							const input = e.target.value;
							// Allow empty string or valid numbers
							if (input === '' || /^\d+$/.test(input)) {
								const newValue = input === '' ? 0 : parseInt(input);
								dispatch({ type: "editValue", rowIdx, colIdx: idx, value: newValue });
							}
						}}
						className="w-full bg-transparent text-center font-semibold outline-none"
					/>
				</div>
			);
		} else if (idx === 3) {
			// REPS - editable
			return (
				<div key={`${rowIdx}-${idx}`} className="col-span-1 font-semibold">
					<input
						type="text"
						inputMode="numeric"
						value={val as number}
						onChange={(e) => {
							const input = e.target.value;
							// Allow empty string or valid numbers
							if (input === '' || /^\d+$/.test(input)) {
								const newValue = input === '' ? 0 : parseInt(input);
								dispatch({ type: "editValue", rowIdx, colIdx: idx, value: newValue });
							}
						}}
						className="w-full bg-transparent text-center font-semibold outline-none"
					/>
				</div>
			);
		} else {
			// Checkbox for DONE
			return (
				<div
					key={`${rowIdx}-${idx}`}
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
			{rows[0].map((title, idx) => {
				return (
					<div key={`header-${idx}`} className="col-span-1 text-gray-700">
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
