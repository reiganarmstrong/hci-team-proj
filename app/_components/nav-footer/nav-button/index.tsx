"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useWorkout } from "@/lib/workout-context";

type Props = {
	src: StaticImageData;
	alt: string;
	text: string;
	linkPath: string;
};

export default ({ src, alt, text, linkPath }: Props) => {
	const pathname = usePathname();
	const { 
		hasActiveWorkout, 
		setShowWorkoutDialog, 
		setPendingNavigation 
	} = useWorkout();
	
	const currentPath = pathname.split("/")[1];
	const targetPath = linkPath.split("/")[1];
	const isActive = targetPath === currentPath;
	
	const defaultBg = isActive ? "bg-figma-navbar-highlighted" : "";

	const handleClick = (e: React.MouseEvent) => {
		// Check if we're on the workout page and trying to navigate away
		const onWorkoutPage = pathname.includes("/workouts/workout-example");
		const navigatingAway = !linkPath.includes("/workouts/workout-example");
		
		if (hasActiveWorkout && onWorkoutPage && navigatingAway) {
			e.preventDefault();
			setPendingNavigation(linkPath);
			setShowWorkoutDialog(true);
		}
	};

	return (
		<Button
			asChild
			className={`rounded-none ${defaultBg} hover:rounded-none hover:bg-figma-navbar-highlighted`}
		>
			<Link 
				className="flex h-fit flex-col gap-2" 
				href={linkPath}
				onClick={handleClick}
			>
				<Image src={src} alt={alt} />
				<div>{text}</div>
			</Link>
		</Button>
	);
};
