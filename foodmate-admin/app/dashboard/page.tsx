import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { info } from "@/lib/offlineLogger";
import {
	createOrUpdateUser,
	getAllUsers,
} from "@/repositories/users/UserRepository";
import { error } from "console";

export default async function Dashboard() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const isNewUser =
		user && Date.now() - new Date(user.createdAt).getTime() < 30_000;

	if (isNewUser) {
		info("New user detected, creating user in database...", user);
		const res = await createOrUpdateUser(
			user.emailAddresses[0]?.emailAddress || "",
			{
				clerkId: user.id,
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				email: user.emailAddresses[0]?.emailAddress || "",
			}
		);
		if (res instanceof Error) {
			error("Error creating user in database", res);
			return <div>Error creating user in database</div>;
		}
		info("User created in database", user);
	}

	return (
		<div>
			<p>{user.id}</p>
			<p>{JSON.stringify(await getAllUsers())}</p>
		</div>
	);
}
