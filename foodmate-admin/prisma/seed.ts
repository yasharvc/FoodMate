import { PrismaClient } from '../app/generated/prisma/index';

const prisma = new PrismaClient();

async function main() {
  await prisma.roles.create({
	data: {
		name: "ADMIN",
		description: 'Admin role',
	},
  });
  await prisma.roles.create({
	data: {
		name: "USER",
		description: 'User role',
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
	