"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import zapPath from "@/public/figma/Zap.svg";

export default function WorkoutsPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
			<Button asChild className="p-6">
				<Link
					href={"/workouts/workout-example"}
					className="flex flex-row gap-4 text-xl"
				>
					<Image src={zapPath} alt="zap icon" />
					<span>Quick Workout</span>
				</Link>
			</Button>
			<h1 className="font-medium text-4xl">Workouts</h1>
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
