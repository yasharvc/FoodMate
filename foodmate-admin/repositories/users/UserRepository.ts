import { PrismaClient } from "@/app/generated/prisma";
import { offlineLoger } from "@/lib/offlineLogger";

export function getUserById (id: number) {
	const db = new PrismaClient();
	return db.users.findUnique({
		where: {
			id,
		},
	});
}

export function getUserByClerkId (clerkId: string) {
	const db = new PrismaClient();
	return db.users.findFirst({
		where: {
			clerkId,
		},
	});
}
export function getUserByEmail (email: string) {
	const db = new PrismaClient();
	return db.users.findUnique({
		where: {
			email,
		},
	});
}

export function createOrUpdateUser (email:string, data: { clerkId: string; firstName: string; lastName: string; email: string }) {
	const db = new PrismaClient();
	return db.users.upsert({
		where: {
			email: email,
		},
		update: data,
		create: data,
	});
}

export async function createUser (data: { clerkId: string; firstName: string; lastName: string; email: string }) {
	const db = new PrismaClient();
	try {
		const user = await db.users.create({
			data,
		});
		offlineLoger.info(`User created in database: ${JSON.stringify(user)}`);
		return user;
	} catch (error) {
		offlineLoger.error(`Error creating user in database: ${JSON.stringify(error)}`);
		return error;
	}
}

export async function updateUser (id: number, data: { clerkId?: string; firstName?: string; lastName?: string; email?: string }) {
	const db = new PrismaClient();
	try {
		const user = await db.users.update({
			where: {
				id,
			},
			data,
		});
		offlineLoger.info(`User updated in database: ${JSON.stringify(user)}`);
		return user;
	} catch (error) {
		offlineLoger.error(`Error updating user in database: ${JSON.stringify(error)}`);
		return error;
	}
}

export async function getAllUsers () {
	const db = new PrismaClient();
	try {
		const users = await db.users.findMany();
		return users;
	} catch (error) {
		offlineLoger.error(`Error fetching all users from database: ${JSON.stringify(error)}`);
		return error;
	}
}