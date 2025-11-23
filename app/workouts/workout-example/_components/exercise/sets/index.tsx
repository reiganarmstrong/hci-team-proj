"use client";

import { Checkbox } from "@/components/ui/checkbox";

type Props = {
	rows: (string[] | (number | boolean)[])[];
};
const rowValToJSX = (val: number | boolean, idx: number) => {
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
				<Checkbox className="col-span-1 rounded-none border-2 border-foreground border-gray-700" />
			</div>
		);
	}
};
export default ({ rows }: Props) => {
	return (
		<div className="grid w-full grid-cols-5 gap-3 text-center font-medium">
			{rows[0].map((title) => {
				return (
					<div key={Math.random()} className="col-span-1 text-gray-700">
						{title}
					</div>
				);
			})}
			{rows.slice(1).map((row) => {
				return row.map((value, idx) => {
					return rowValToJSX(value as number | boolean, idx);
				});
			})}
		</div>
	);
};
