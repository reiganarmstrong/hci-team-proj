"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function WorkoutsPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
			<h1 className="font-medium text-4xl">Example Workout</h1>
			<Link
				href="/workouts/add-exercise"
				className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
			>
				<Plus size={20} />
				Add Exercise
			</Link>
		</div>
	);
}