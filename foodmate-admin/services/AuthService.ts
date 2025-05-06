import { USER_ROLE_NAME } from "@/constants/roles";
import { assignRoleToUser, getRoleByName } from "@/repositories/roles/RoleRepository";
import { createOrUpdateUser } from "@/repositories/users/UserRepository";
import { clerkClient } from "@clerk/nextjs/server";

export async function addNewUser (user: { clerkId: string; email: string; firstName: string; lastName: string }) {
	// Validation
	if (!user.clerkId || !user.email || !user.firstName || !user.lastName) {
		throw new Error("Missing required user information");
	}
	const userRole = await getRoleByName(USER_ROLE_NAME);

	// create or update user in database
	const userInDb = await createOrUpdateUser(user.email, {
		clerkId: user.clerkId,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	});

	if (userInDb instanceof Error) {
		throw new Error("Error creating or updating user in database");
	}

	// Assign user role to user
	if (userRole) {
		await assignRoleToUser(userInDb.id, userRole.id);
	} else {
		throw new Error("Error assigning role to user");
	}

	await addRoleIntoUserMetadata(user.clerkId, userRole.name);

	return userInDb;
}

async function addRoleIntoUserMetadata (clerkId: string, role: string) {
	const user = await (await clerkClient()).users.getUser(clerkId);
	if (!user) {
		throw new Error("User not found in Clerk");
	}
	if ((user.publicMetadata.roles as string[] ?? []).includes(role)) {
		return;
	}
	(await clerkClient()).users.updateUserMetadata(clerkId, {
		publicMetadata: {
			roles: [
				...(user.publicMetadata.roles as string[] ?? []),
				role],
		},
	});
}