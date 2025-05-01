import { PrismaClient } from "@/app/generated/prisma";
import { getUserById } from "../users/UserRepository";

export async function getRoleByName (name: string) {
	const db = new PrismaClient();
	return await db.roles.findUnique({
		where: {
			name,
		},
	});
}

export async function assignRoleToUser (userId: number, roleId: number) {
	const db = new PrismaClient();
	// Check if the user exists
	const user = await getUserById(userId);
	if (!user) {
		throw new Error(`User with ID ${userId} not found`);
	}
	
	// Check if the role exists
	const role = await db.roles.findUnique({
		where: {
			id: roleId,
		},
	});
	if (!role) {
		throw new Error(`Role with ID ${roleId} not found`);
	}

	// Check if the user already has the role
	const existingRole = await db.userRoles.findFirst({
		where: {
			userId,
			roleId,
		},
	});
	if (existingRole) {
		return existingRole; // Role already assigned, return the existing record
	}

	return await db.userRoles.create({
		data: {
			userId,
			roleId,
		},
	});
}