type Props = {
	content: string;
};
export default ({ content }: Props) => {
	return (
		<div className="flex h-12 w-12 flex-row items-center justify-center rounded-full border-4 border-foreground p-2 text-center font-bold text-xl">
			{content}
		</div>
	);
};
