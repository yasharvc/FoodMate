import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "../generated/prisma";

export default async function Dashboard() {
	const db = new PrismaClient();
	const users = await db.users.findMany();
	const user = await auth();
	if (!user) {
		redirect("/sign-in");
	}

	return (
		<div>
			<p>{user.userId}</p>
			<p>{JSON.stringify(users)}</p>
		</div>
	);
}
