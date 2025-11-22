"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SAMPLE_EXERCISES } from "@/lib/exercises-data";
import { getAllExercises } from "@/lib/exercises-storage";
import { useEffect, useState } from "react";
import type { Exercise } from "@/lib/types";

export default function ExerciseDetailsPage() {
	const params = useParams();
	const exerciseId = params.id as string;
	const [exercise, setExercise] = useState<Exercise | null>(null);

	useEffect(() => {
		const allExercises = getAllExercises(SAMPLE_EXERCISES);
		const found = allExercises.find((ex) => ex.id === exerciseId);
		setExercise(found || null);
	}, [exerciseId]);

	if (!exercise) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center p-8">
				<h1 className="mb-4 font-semibold text-2xl">Exercise not found</h1>
				<Link
					href="/workouts/add-exercise"
					className="text-blue-600 hover:underline"
				>
					Back to exercises
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pb-24">
			{/* Header */}
			<div className="border-b border-border bg-background p-4">
				<div className="flex items-center gap-4">
					<Link
						href="/workouts/add-exercise"
						className="rounded-lg p-2 hover:bg-muted"
					>
						<ChevronLeft size={24} />
					</Link>
					<h1 className="font-semibold text-2xl">{exercise.name}</h1>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Exercise Illustration */}
				<div className="mb-6 flex items-center justify-center rounded-2xl border-2 border-border bg-background p-8">
					<div className="text-center text-gray-400">
						<div className="mb-2 text-6xl">🏋️</div>
						<p className="text-sm">Exercise illustration</p>
					</div>
				</div>

				{/* Instructions */}
				<section className="mb-6">
					<h2 className="mb-3 font-semibold text-xl">Instructions</h2>
					<ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed">
						{exercise.instructions.map((instruction, index) => (
							<li key={index} className="text-foreground/80">
								{instruction}
							</li>
						))}
					</ol>
				</section>

				{/* Notes */}
				{exercise.notes && (
					<section className="mb-6">
						<h2 className="mb-3 font-semibold text-xl">Notes</h2>
						<p className="text-sm leading-relaxed text-foreground/80">
							{exercise.notes}
						</p>
					</section>
				)}

				{/* Muscles Worked */}
				<section className="mb-6">
					<h2 className="mb-3 font-semibold text-xl">Muscles Worked</h2>
					<div className="flex flex-wrap gap-2">
						{exercise.muscles.map((muscle) => (
							<span
								key={muscle}
								className="rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground text-sm"
							>
								{muscle}
							</span>
						))}
					</div>
				</section>

				{/* Required Equipment */}
				<section className="mb-6">
					<h2 className="mb-3 font-semibold text-xl">Required Equipment</h2>
					<div className="flex flex-wrap gap-2">
						{exercise.equipment.map((item) => (
							<span
								key={item}
								className="rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground text-sm"
							>
								{item}
							</span>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

