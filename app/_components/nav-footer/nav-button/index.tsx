"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
	src: StaticImageData;
	alt: string;
	text: string;
	linkPath: string;
};

export default ({ src, alt, text, linkPath }: Props) => {
	const pathname = usePathname().split("/")[1];
	const defaultBg =
		linkPath.split("/")[1] === pathname ? "bg-figma-navbar-highlighted" : "";
	console.log(pathname);
	return (
		<Button
			asChild
			className={`rounded-none ${defaultBg} hover:rounded-none hover:bg-figma-navbar-highlighted`}
		>
			<Link className="flex h-fit flex-col gap-2" href={linkPath}>
				<Image src={src} alt={alt} />
				<div>{text}</div>
			</Link>
		</Button>
	);
};
