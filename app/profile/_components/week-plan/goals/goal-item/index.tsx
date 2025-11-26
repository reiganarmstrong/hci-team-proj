import CircleIcon from "../../circle-icon";

type Props = {
	circleContent: string;
	textContent: string;
};

export default ({ circleContent, textContent }: Props) => {
	return (
		<div className="flex w-full flex-row items-center gap-2 bg-figma-dark-grey p-2 text-sm sm:gap-4 sm:text-base">
			<CircleIcon content={circleContent} />
			<div className="break-words">{textContent}</div>
		</div>
	);
};
