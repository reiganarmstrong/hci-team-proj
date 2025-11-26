type Props = {
	content: string;
};
export default ({ content }: Props) => {
	return (
		<div className="flex h-8 w-8 flex-row items-center justify-center rounded-full border-2 border-foreground p-1 text-center font-bold text-sm sm:h-12 sm:w-12 sm:border-4 sm:p-2 sm:text-xl">
			{content}
		</div>
	);
};
