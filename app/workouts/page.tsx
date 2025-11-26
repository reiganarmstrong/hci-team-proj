"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronRight, Folder, X } from "lucide-react";

export default function WorkoutsPage() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const toggleArea = (area: string) => {
    const newAreas = new Set(selectedAreas);
    if (newAreas.has(area)) {
      newAreas.delete(area);
    } else {
      newAreas.add(area);
    }
    setSelectedAreas(newAreas);
  };

  const clearFilters = () => {
    setSelectedTags(new Set());
    setSelectedAreas(new Set());
  };

  const folders = [
    {
      id: "upper-lower",
      name: "Upper Lower Split",
      workouts: [
        { name: "Upper A", tags: ["Upper", "Strength"], time: "60min", areas: ["Chest", "Back", "Shoulders"] },
        { name: "Lower A", tags: ["Lower", "Strength"], time: "60min", areas: ["Quads", "Hamstrings", "Glutes"] },
      ],
    },
    {
      id: "6-day-ppl",
      name: "6 Day PPL",
      workouts: [
        { name: "Push A", tags: ["Push", "Upper", "PPL"], time: "45min", areas: ["Chest", "Shoulders", "Triceps"] },
        { name: "Pull A", tags: ["Pull", "Upper", "PPL"], time: "45min", areas: ["Back", "Biceps"] },
        { name: "Legs A", tags: ["Legs", "Lower", "PPL"], time: "60min", areas: ["Quads", "Hamstrings"] },
      ],
    },
  ];

  const uncategorizedWorkouts = [
    { name: "Push", tags: ["Push", "Upper", "PPL"], time: "45min", areas: ["Chest", "Shoulders", "Triceps"] },
    { name: "Arms", tags: ["Arms", "Upper"], time: "45min", areas: ["Biceps", "Triceps"] },
    { name: "Legs", tags: ["Legs", "Lower", "PPL"], time: "45min", areas: ["Quads", "Glutes", "Core"] },
  ];

  // Get all unique tags and areas
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    [...folders.flatMap(f => f.workouts), ...uncategorizedWorkouts].forEach(w => {
      w.tags.forEach(t => tags.add(t));
    });
    return Array.from(tags).sort();
  }, []);

  const allAreas = useMemo(() => {
    const areas = new Set<string>();
    [...folders.flatMap(f => f.workouts), ...uncategorizedWorkouts].forEach(w => {
      w.areas.forEach(a => areas.add(a));
    });
    return Array.from(areas).sort();
  }, []);

  // Filter workouts based on search and filters
  const filterWorkout = (workout: { name: string; tags: string[]; areas: string[] }) => {
    // Search filter
    if (searchQuery && !workout.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Tag filter (workout must have at least one selected tag)
    if (selectedTags.size > 0) {
      const hasTag = workout.tags.some(tag => selectedTags.has(tag));
      if (!hasTag) return false;
    }

    // Area filter (workout must have at least one selected area)
    if (selectedAreas.size > 0) {
      const hasArea = workout.areas.some(area => selectedAreas.has(area));
      if (!hasArea) return false;
    }

    return true;
  };

  const filteredFolders = folders.map(folder => ({
    ...folder,
    workouts: folder.workouts.filter(filterWorkout),
  })).filter(folder => folder.workouts.length > 0);

  const filteredUncategorized = uncategorizedWorkouts.filter(filterWorkout);

  const hasActiveFilters = selectedTags.size > 0 || selectedAreas.size > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Search Bar */}
      <div className="border-b border-border bg-background p-4">
        <div className="relative flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-3 left-3 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2.5 pr-4 pl-10 outline-none focus:border-ring"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`rounded-lg border p-2.5 transition-colors ${
              showFilters || hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-border bg-background hover:bg-muted"
            }`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Filters</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Tags Filter */}
            <div className="mb-4">
              <p className="mb-2 font-medium text-sm">Tags</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      selectedTags.has(tag)
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Areas Filter */}
            <div>
              <p className="mb-2 font-medium text-sm">Areas Worked</p>
              <div className="flex flex-wrap gap-2">
                {allAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      selectedAreas.has(area)
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from(selectedTags).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {Array.from(selectedAreas).map((area) => (
              <span
                key={area}
                className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
              >
                {area}
                <button
                  type="button"
                  onClick={() => toggleArea(area)}
                  className="hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Quick Start Button */}
        <Link href="/workouts/workout-example" className="block">
          <button
            type="button"
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 font-medium text-background"
          >
            <span className="text-xl">⚡</span>
            Quick Start
          </button>
        </Link>

        {/* Folders Section */}
        {filteredFolders.length > 0 && (
          <>
            <h2 className="mb-3 font-semibold text-xl">Folders</h2>
            
            {filteredFolders.map((folder) => (
              <div key={folder.id} className="mb-2">
                {/* Folder Header */}
                <button
                  type="button"
                  onClick={() => toggleFolder(folder.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={24} className="text-foreground" />
                    <span className="font-medium text-lg">{folder.name}</span>
                    <span className="text-muted-foreground text-sm">({folder.workouts.length})</span>
                  </div>
                  <ChevronRight
                    size={24}
                    className={`text-muted-foreground transition-transform ${
                      expandedFolders.has(folder.id) ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Folder Contents */}
                {expandedFolders.has(folder.id) && (
                  <div className="ml-4 mt-2 space-y-2">
                    {folder.workouts.map((workout, idx) => (
                      <Link
                        key={idx}
                        href="/workouts/workout-example"
                        className="block text-foreground no-underline"
                      >
                        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted">
                          <div className="flex-1">
                            <p className="mb-2 font-bold text-lg">{workout.name}</p>
                            <div className="mb-2 flex flex-wrap gap-1">
                              {workout.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-700 px-2.5 py-0.5 font-medium text-white text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              <span className="text-muted-foreground text-xs">...</span>
                            </div>
                            <p className="mb-0 font-semibold text-sm">Time: {workout.time}</p>
                            <p className="mb-0 text-muted-foreground text-sm">
                              Areas Worked: {workout.areas.join(", ")}
                            </p>
                          </div>
                          <ChevronRight size={24} className="shrink-0 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Three Dots */}
            {filteredUncategorized.length > 0 && (
              <div className="my-3 text-center text-2xl">• • •</div>
            )}
          </>
        )}

        {/* Uncategorized Section */}
        {filteredUncategorized.length > 0 && (
          <>
            <h2 className="mb-3 font-semibold text-xl">Uncategorized</h2>
            
            <div className="space-y-2">
              {filteredUncategorized.map((workout, idx) => (
                <Link
                  key={idx}
                  href="/workouts/workout-example"
                  className="block text-foreground no-underline"
                >
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted">
                    <div className="flex-1">
                      <p className="mb-2 font-bold text-lg">{workout.name}</p>
                      <div className="mb-2 flex flex-wrap gap-1">
                        <span className="text-muted-foreground text-sm">Tags:</span>
                        {workout.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-700 px-2.5 py-0.5 font-medium text-white text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-muted-foreground text-xs">...</span>
                      </div>
                      <p className="mb-0 font-semibold text-sm">Time: {workout.time}</p>
                      <p className="mb-0 text-muted-foreground text-sm">
                        Areas Worked: {workout.areas.join(", ")}
                      </p>
                    </div>
                    <ChevronRight size={24} className="shrink-0 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {filteredFolders.length === 0 && filteredUncategorized.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No workouts found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}