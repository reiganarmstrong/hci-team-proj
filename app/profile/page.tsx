"use client";
import Image from "next/image";
import account_circle_path from "@/public/figma/account_circle.png";
import WeekPlan from "./_components/week-plan";
import { ExpBar } from "@/components/ui/exp-bar";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-background pb-24">
			<div className="flex flex-col items-center justify-center gap-4 p-4 pt-8">
				<Image
					src={account_circle_path}
					width={100}
					height={100}
					alt="profile picture"
					className="col-span-full"
				/>
				<div className="font-medium text-2xl sm:text-4xl">First Last</div>
				
				{/* EXP Bar */}
				<ExpBar />
			</div>
			<div className="flex-1 overflow-auto px-4 pb-4">
				<WeekPlan />
			</div>
		</div>
	);
}
