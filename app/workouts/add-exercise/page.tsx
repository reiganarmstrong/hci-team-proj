"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Filter, ChevronRight, Info } from "lucide-react";
import { SAMPLE_EXERCISES } from "@/lib/exercises-data";
import {
	getAllExercises,
	getSelectedExercisesFromStorage,
	saveSelectedExercisesToStorage,
} from "@/lib/exercises-storage";
import type { Exercise, SortBy } from "@/lib/types";

export default function AddExercisePage() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<SortBy>("alphabetical");
	const [selectedExercises, setSelectedExercises] = useState<Set<string>>(
		new Set(),
	);
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
		new Set(),
	);
	const [allExercises, setAllExercises] = useState<Exercise[]>([]);

	// Load exercises and selected state on mount
	useEffect(() => {
		setAllExercises(getAllExercises(SAMPLE_EXERCISES));
		const saved = getSelectedExercisesFromStorage();
		setSelectedExercises(new Set(saved));
	}, []);

	// Filter and group/sort exercises
	const groupedExercises = useMemo(() => {
		let filtered = allExercises;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter((exercise) =>
				exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Sort alphabetically first
		filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

		if (sortBy === "alphabetical") {
			// Return flat list under single group
			return { All: filtered };
		}

		// Group by selected sort method
		const grouped: Record<string, Exercise[]> = {};

		if (sortBy === "muscleGroup") {
			// An exercise can appear under multiple muscle groups
			filtered.forEach((exercise) => {
				exercise.muscles.forEach((muscle) => {
					if (!grouped[muscle]) {
						grouped[muscle] = [];
					}
					// Avoid duplicates in the same group
					if (!grouped[muscle].some((ex) => ex.id === exercise.id)) {
						grouped[muscle].push(exercise);
					}
				});
			});
			// Sort exercises within each group
			Object.keys(grouped).forEach((key) => {
				grouped[key].sort((a, b) => a.name.localeCompare(b.name));
			});
		} else if (sortBy === "equipment") {
			// Group by primary equipment
			filtered.forEach((exercise) => {
				const primaryEquipment = exercise.equipment[0] || "Other";
				if (!grouped[primaryEquipment]) {
					grouped[primaryEquipment] = [];
				}
				grouped[primaryEquipment].push(exercise);
			});
		}

		// Remove empty groups and sort group names
		const sortedGroups: Record<string, Exercise[]> = {};
		Object.keys(grouped)
			.sort()
			.forEach((key) => {
				if (grouped[key].length > 0) {
					sortedGroups[key] = grouped[key];
				}
			});

		return sortedGroups;
	}, [searchQuery, sortBy, allExercises]);

	const toggleGroup = (group: string) => {
		const newExpanded = new Set(expandedGroups);
		if (newExpanded.has(group)) {
			newExpanded.delete(group);
		} else {
			newExpanded.add(group);
		}
		setExpandedGroups(newExpanded);
	};

	const toggleExerciseSelection = (id: string) => {
		const newSelected = new Set(selectedExercises);
		if (newSelected.has(id)) {
			newSelected.delete(id);
		} else {
			newSelected.add(id);
		}
		setSelectedExercises(newSelected);
	};

	const handleAddSelectedExercises = () => {
		// Save selected exercises to localStorage
		saveSelectedExercisesToStorage(Array.from(selectedExercises));
		// Navigate back to workouts
		router.push("/workouts");
	};

	return (
		<div className="flex min-h-screen flex-col bg-background pb-24">
			{/* Header */}
			<div className="border-border border-b bg-background p-4">
				<div className="flex items-center gap-4">
					<Link href="/workouts" className="rounded-lg p-2 hover:bg-muted">
						<ChevronLeft size={24} />
					</Link>
					<h1 className="font-semibold text-2xl">Add Exercise</h1>
				</div>

				{/* Create Exercise Button */}
				<button
					type="button"
					className="mt-4 w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground"
				>
					+ Create Exercise
				</button>

				{/* Search */}
				<div className="relative mt-4">
					<Search className="absolute top-3 left-3 text-muted-foreground" size={20} />
					<input
						type="text"
						placeholder="Search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-lg border border-border bg-background py-2 pr-4 pl-10 outline-none focus:border-ring"
					/>
				</div>

				{/* Sort By */}
				<div className="mt-4 flex items-center gap-2">
					<Filter size={20} className="shrink-0 text-muted-foreground" />
					<button
						type="button"
						onClick={() => setSortBy("alphabetical")}
						className={`cursor-pointer rounded-full border px-4 py-1 text-sm transition-colors ${
							sortBy === "alphabetical"
								? "border-blue-500 bg-blue-50 text-blue-600"
								: "border-border bg-background"
						}`}
					>
						Alphabetical
					</button>
					<button
						type="button"
						onClick={() => setSortBy("equipment")}
						className={`cursor-pointer rounded-full border px-4 py-1 text-sm transition-colors ${
							sortBy === "equipment"
								? "border-blue-500 bg-blue-50 text-blue-600"
								: "border-border bg-background"
						}`}
					>
						Equipment
					</button>
					<button
						type="button"
						onClick={() => setSortBy("muscleGroup")}
						className={`cursor-pointer rounded-full border px-4 py-1 text-sm transition-colors ${
							sortBy === "muscleGroup"
								? "border-blue-500 bg-blue-50 text-blue-600"
								: "border-border bg-background"
						}`}
					>
						Muscle Group
					</button>
				</div>
			</div>

			{/* Exercise List */}
			<div className="flex-1 overflow-y-auto">
				{Object.entries(groupedExercises).map(([group, exercises]) => (
					<div key={group} className="border-border border-b">
						{/* Group Header - hide for alphabetical sort */}
						{sortBy !== "alphabetical" && (
							<button
								type="button"
								onClick={() => toggleGroup(group)}
								className="flex w-full items-center justify-between bg-background p-4 hover:bg-muted"
							>
								<span className="font-semibold text-lg">{group}</span>
								<ChevronRight
									className={`transition-transform ${
										expandedGroups.has(group) ? "rotate-90" : ""
									}`}
									size={20}
								/>
							</button>
						)}

						{/* Exercise Items */}
						{(sortBy === "alphabetical" || expandedGroups.has(group)) && (
							<div>
								{exercises.map((exercise) => {
									const isSelected = selectedExercises.has(exercise.id);
									return (
										<div
											key={`${group}-${exercise.id}`}
											onClick={() => toggleExerciseSelection(exercise.id)}
											className={`relative flex cursor-pointer items-center gap-3 border-border border-t p-4 transition-colors ${
												isSelected
													? "border-blue-500 border-r-4 border-l-4 bg-blue-50 hover:bg-blue-50"
													: "border-transparent border-r-4 border-l-4 bg-muted/30 hover:bg-muted"
											}`}
										>
											{/* Exercise Icon Placeholder */}
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-background">
												<span className="text-2xl">💪</span>
											</div>

											{/* Exercise Name and Tags */}
											<div className="flex flex-1 flex-col gap-1">
												<p className="font-medium">{exercise.name}</p>
												{/* Tags for alphabetical view */}
												{sortBy === "alphabetical" && (
													<div className="flex flex-wrap gap-1">
														{exercise.muscles.map((muscle) => (
															<span
																key={muscle}
																className="rounded bg-blue-100 px-2 py-0.5 text-blue-700 text-xs"
															>
																{muscle}
															</span>
														))}
														{exercise.equipment.slice(0, 2).map((equip) => (
															<span
																key={equip}
																className="rounded bg-gray-200 px-2 py-0.5 text-gray-700 text-xs"
															>
																{equip}
															</span>
														))}
													</div>
												)}
											</div>

											{/* Info Button */}
											<Link
												href={`/workouts/exercise/${exercise.id}`}
												onClick={(e) => e.stopPropagation()}
												className="rounded-full p-2 hover:bg-background"
											>
												<Info size={20} className="text-foreground" />
											</Link>
										</div>
									);
								})}
							</div>
						)}
					</div>
				))}
			</div>

			{/* Add Selected Button */}
			<div className="fixed right-0 bottom-16 left-0 border-border border-t bg-background p-4">
				<button
					type="button"
					onClick={handleAddSelectedExercises}
					disabled={selectedExercises.size === 0}
					className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground disabled:opacity-50"
				>
					Add Selected Exercises ({selectedExercises.size})
				</button>
			</div>
		</div>
	);
}

