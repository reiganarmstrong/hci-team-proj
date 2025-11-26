import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircleIcon from "./circle-icon";
import Goals from "./goals";

export default () => {
	const dayInfo = [
		{ day: "Mon", info: "W" },
		{ day: "Tue", info: "W" },
		{ day: "Wed", info: "W" },
		{ day: "Thu", info: "R" },
		{ day: "Fri", info: "W" },
		{ day: "Sat", info: "W" },
		{ day: "Sun", info: "R" },
	] as const;
	return (
		<div className="flex w-full flex-col items-center justify-center gap-2">
			<div className="w-full text-left font-medium text-xl sm:mx-auto sm:w-auto sm:text-2xl">Week Plan:</div>
			<Tabs defaultValue="Mon" className="w-full gap-10 sm:mx-auto sm:w-auto">
				<TabsList className="grid min-h-fit w-full grid-cols-7 gap-0.5 overflow-x-auto bg-background p-0 sm:flex sm:w-auto sm:min-w-fit">
					{dayInfo.map((value, index) => {
						let marginVal = "mx-0";
						if (index === 0) {
							marginVal = "mr-0";
						} else if (index === dayInfo.length - 1) {
							marginVal = "ml-0";
						}
						if (index % 2 === 0) {
							return (
								<TabsTrigger
									value={value.day}
									className={`${marginVal} flex-1 rounded-none bg-figma-dark-grey p-2 pb-3 data-[state=active]:border-t-3 data-[state=active]:border-t-blue-400 data-[state=active]:bg-figma-dark-grey sm:flex-none sm:p-4`}
									key={Math.random()}
								>
									<div className="flex flex-col gap-2 sm:gap-3">
										<div className="text-sm sm:text-xl">{value.day}</div>
										<CircleIcon content={value.info} />
									</div>
								</TabsTrigger>
							);
						}
						return (
							<TabsTrigger
								value={value.day}
								className={`${marginVal} flex-1 rounded-none bg-figma-light-grey p-2 pb-3 data-[state=active]:border-t-3 data-[state=active]:border-t-blue-400 data-[state=active]:bg-figma-light-grey sm:flex-none sm:p-4`}
								key={Math.random()}
							>
								<div className="flex flex-col gap-2 sm:gap-3">
									<div className="text-sm sm:text-xl">{value.day}</div>
									<CircleIcon content={value.info} />
								</div>
							</TabsTrigger>
						);
					})}
				</TabsList>
				{dayInfo.map((value) => {
					return (
						<TabsContent value={value.day} key={Math.random()} className="w-full">
							<Goals />
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
};
