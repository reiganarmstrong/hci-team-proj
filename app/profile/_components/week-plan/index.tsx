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
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="w-full text-left font-medium text-2xl">Week Plan:</div>
			<Tabs defaultValue="Mon" className="w-full gap-10">
				<TabsList className="min-h-fit min-w-fit bg-background">
					{dayInfo.map((value, index) => {
						let marginVal = "ml-1 mr-1";
						if (index === 0) {
							marginVal = "mr-1";
						} else if (index === dayInfo.length - 1) {
							marginVal = "ml-1";
						}
						if (index % 2 === 0) {
							return (
								<TabsTrigger
									value={value.day}
									className={`${marginVal} rounded-none bg-figma-dark-grey pb-3 data-[state=active]:border-t-3 data-[state=active]:border-t-blue-400 data-[state=active]:bg-figma-dark-grey`}
									key={Math.random()}
								>
									<div className="flex flex-col gap-3">
										<div className="text-xl">{value.day}</div>
										<CircleIcon content={value.info} />
									</div>
								</TabsTrigger>
							);
						}
						return (
							<TabsTrigger
								value={value.day}
								className={`${marginVal} rounded-none bg-figma-light-grey pb-3 data-[state=active]:border-t-3 data-[state=active]:border-t-blue-400 data-[state=active]:bg-figma-light-grey`}
								key={Math.random()}
							>
								<div className="flex flex-col gap-3">
									<div className="text-xl">{value.day}</div>
									<CircleIcon content={value.info} />
								</div>
							</TabsTrigger>
						);
					})}
				</TabsList>
				{dayInfo.map((value) => {
					return (
						<TabsContent value={value.day} key={Math.random()}>
							<Goals />
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
};
