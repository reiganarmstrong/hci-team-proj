import CircleIcon from "../../circle-icon";

type Props = {
	circleContent: string;
	textContent: string;
};

export default ({ circleContent, textContent }: Props) => {
	return (
		<div className="flex w-full flex-row items-center gap-4 bg-figma-dark-grey p-2">
			<CircleIcon content={circleContent} />
			<div>{textContent}</div>
		</div>
	);
};
