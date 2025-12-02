"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavFooter from "./_components/nav-footer";
import { WorkoutProvider } from "@/lib/workout-context";
import { WorkoutNavigationDialog } from "@/components/ui/workout-navigation-dialog";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<WorkoutProvider>
					<div className="z-40 mb-30">{children}</div>
					<NavFooter />
					<WorkoutNavigationDialog />
				</WorkoutProvider>
			</body>
		</html>
	);
}
