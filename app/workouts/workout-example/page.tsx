"use client";
import { ChevronLeft, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import Exercise from "./_components/exercise";
import TimeLeft from "./_components/time-left";

type Props = {
	initExercises?: ReactNode[];
};

export default ({
	initExercises = [<Exercise key={Math.random()} />],
}: Props) => {
	const [exercises, setExercises] = useState<ReactNode[]>(initExercises);
	const handleAddExercise = () => {
		setExercises((prev) => {
			return [...prev, <Exercise key={Math.random()} />];
		});
	};
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 p-8">
			<span className="relative font-bold text-4xl">
				<Link
					href={"/workouts"}
					className="-left-8 -translate-1/2 absolute top-1/2 inline-block h-fit w-fit"
				>
					<ChevronLeft width={30} height={30} />
				</Link>
				Quick Workout
			</span>
			<div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
				<div className="flex w-full flex-row items-center justify-center gap-2 text-gray-500">
					<Clock />
					<span className="">
						Time Left: <TimeLeft />
					</span>
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-4">
					{exercises}
				</div>
			</div>
			<Button
				type="button"
				className="w-full max-w-lg p-4"
				onClick={handleAddExercise}
			>
				<Plus />
				Add Exercise
			</Button>
			<Button
				type="button"
				variant={"ghost"}
				className="w-full max-w-lg border-2 border-foreground p-4"
				asChild
			>
				<Link href={"/"}>Finish Workout</Link>
			</Button>
		</div>
	);
};
