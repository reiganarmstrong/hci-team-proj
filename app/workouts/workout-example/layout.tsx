import { connection } from "next/server";

export default async function WorkoutExampleLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await connection();
	return <div>{children}</div>;
}
