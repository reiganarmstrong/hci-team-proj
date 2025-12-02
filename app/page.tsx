"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="border-b border-border bg-background p-4">
        <h1 className="font-semibold text-2xl">Schedule</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 pt-2">
        {/* Today */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-muted-foreground text-sm">Today:</p>
          <Link href="/workouts/workout-example?preset=true" className="block text-foreground no-underline">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-4 shadow-sm transition-colors hover:bg-muted">
              <div className="flex-1">
                <p className="mb-2 font-bold text-lg">Push B</p>
                <div className="mb-2 flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    Push
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    Upper
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    PPL
                  </span>
                  <span className="text-muted-foreground text-xs">...</span>
                </div>
                <p className="mb-0 font-semibold text-sm">Time: 45min</p>
                <p className="mb-0 text-muted-foreground text-sm">
                  Areas Worked: Chest, Shoulders, ...
                </p>
              </div>
              <ChevronRight size={24} className="shrink-0 text-muted-foreground" />
            </div>
          </Link>
        </div>

        {/* Tuesday */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-muted-foreground text-sm">Tuesday:</p>
          <Link href="/workouts/workout-example?preset=true" className="block text-foreground no-underline">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-4 shadow-sm transition-colors hover:bg-muted">
              <div className="flex-1">
                <p className="mb-2 font-bold text-lg">Pull B</p>
                <div className="mb-2 flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    Pull
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    Upper
                  </span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                    PPL
                  </span>
                  <span className="text-muted-foreground text-xs">...</span>
                </div>
                <p className="mb-0 font-semibold text-sm">Time: 45min</p>
                <p className="mb-0 text-muted-foreground text-sm">
                  Areas Worked: Back, Biceps
                </p>
              </div>
              <ChevronRight size={24} className="shrink-0 text-muted-foreground" />
            </div>
          </Link>
        </div>

        {/* Section Header */}
        <h2 className="mb-3 mt-6 font-semibold text-xl">Recent Workouts</h2>

        {/* 11/14 */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-muted-foreground text-sm">11/14/2025:</p>
          <div className="rounded-lg border border-border bg-muted/30 p-4 shadow-sm">
            <p className="mb-1 font-bold text-lg">Push A</p>
            <p className="mb-0 font-semibold text-sm">Time: 45min</p>
            <p className="mb-3 text-muted-foreground text-sm">
              Areas Worked: Chest, Shoulders, Triceps
            </p>
            <p className="mb-2 font-semibold text-muted-foreground text-sm">
              Tags: 
              <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                Push
              </span>
              <span className="ml-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                Upper
              </span>
              <span className="ml-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                PPL
              </span>
            </p>

            <div className="flex items-center gap-3">
              {[
                { label: "Bench Press", icon: "💪" },
                { label: "Bench Press", icon: "💪" },
                { label: "Bench Press", icon: "💪" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: "70px" }}>
                  <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-lg bg-background">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-center text-muted-foreground text-xs leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
              <div className="flex h-14 w-14 items-center justify-center text-2xl">
                <span>• • •</span>
              </div>
            </div>
          </div>
        </div>

        {/* 11/13 */}
        <div className="mb-5">
          <p className="mb-2 font-semibold text-muted-foreground text-sm">11/13/2025:</p>
          <div className="rounded-lg border border-border bg-muted/30 p-4 shadow-sm">
            <p className="mb-1 font-bold text-lg">Pull A</p>
            <p className="mb-0 font-semibold text-sm">Time: 45min</p>
            <p className="mb-3 text-muted-foreground text-sm">
              Areas Worked: Back, Biceps
            </p>
            <p className="mb-2 font-semibold text-muted-foreground text-sm">
              Tags: 
              <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                Pull
              </span>
              <span className="ml-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                Upper
              </span>
              <span className="ml-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-700 text-xs">
                PPL
              </span>
            </p>

            <div className="flex items-center gap-3">
              {[
                { label: "Pull Ups", icon: "💪" },
                { label: "Barbell Row", icon: "💪" },
                { label: "Face Pulls", icon: "💪" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: "70px" }}>
                  <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-lg bg-background">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-center text-muted-foreground text-xs leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
              <div className="flex h-14 w-14 items-center justify-center text-2xl">
                <span>• • •</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}