export interface Exercise {
	id: string;
	name: string;
	equipment: string[];
	muscles: string[];
	instructions: string[];
	notes?: string;
	imageUrl?: string;
}

export type SortBy = "alphabetical" | "equipment" | "muscleGroup";

