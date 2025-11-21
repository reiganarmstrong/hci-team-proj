"use client";
import Image from "next/image";
import account_circle_path from "@/public/figma/account_circle.png";
import WeekPlan from "./_components/week-plan";

export default function Home() {
	return (
		<div className="mt-10 mb-10 flex h-full w-full flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center justify-center gap-2">
				<Image
					src={account_circle_path}
					width={100}
					height={100}
					alt="profile picture"
					className="col-span-full"
				/>
				<div className="font-medium text-4xl">First Last</div>
			</div>
			<WeekPlan />
		</div>
	);
}
