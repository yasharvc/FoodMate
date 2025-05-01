import { ADMIN_ROLE_DESCRIPTION, ADMIN_ROLE_NAME, USER_ROLE_NAME } from '@/constants/roles';
import { PrismaClient } from '../app/generated/prisma/index';
import { USER_ROLE_DESCRIPTION } from '../constants/roles';

const prisma = new PrismaClient();

async function main () {
	await prisma.roles.create({
		data: {
			name: ADMIN_ROLE_NAME,
			description: ADMIN_ROLE_DESCRIPTION,
		},
	});
	await prisma.roles.create({
		data: {
			name: USER_ROLE_NAME,
			description: USER_ROLE_DESCRIPTION,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	}).catch(async (e) => {
		console.error(JSON.stringify(e));
		await prisma.$disconnect();
		process.exit(1);
	});
