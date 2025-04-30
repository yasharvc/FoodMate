import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "../generated/prisma";

export default async function Dashboard() {
	const db = new PrismaClient();
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const isNewUser =
		user && Date.now() - new Date(user.createdAt).getTime() < 30_000;

	if (isNewUser) {
		console.log("New user detected, creating user in database...", user);
		try {
			await db.users.create({
				data: {
					clerkId: user.id ?? "",
					email: user.emailAddresses[0].emailAddress ?? "",
					firstName: user.firstName ?? "",
					lastName: user.lastName ?? "",
				},
			});
		} catch (error) {
			console.error("Error creating user in database:", error);
		}
	}

	return (
		<div>
			<p>{user.id}</p>
			<p>{JSON.stringify(await db.users.findMany())}</p>
		</div>
	);
}
