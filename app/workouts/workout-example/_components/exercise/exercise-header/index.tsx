import { Info } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export type ExerciseHeaderProps = {
	nameText?: string;
	restText?: string;
	toolTipText?: string;
};

export default ({
	nameText = "Bench Press",
	restText = "Rest: 1min 30sec",
	toolTipText = `To do a bench press, set up by lying on the bench with feet flat and
						a grip slightly wider than shoulder-width, then press the bar up,
						lower it to your chest with elbows tucked, pause, and press back up
						to the starting position`,
}: ExerciseHeaderProps) => {
	return (
		<div className="flex w-full flex-row items-center justify-around gap-4">
			<div className="flex w-full flex-col items-center justify-start">
				<div className="w-full text-left font-bold text-xl">{nameText}</div>
				<div className="w-full text-left text-gray-700 text-md">{restText}</div>
			</div>
			<Tooltip>
				<TooltipTrigger asChild>
					<Info />
				</TooltipTrigger>
				<TooltipContent>
					<p className="max-w-sm text-wrap">{toolTipText}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
