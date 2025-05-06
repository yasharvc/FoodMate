import { currentUser } from "@clerk/nextjs/server";

export const checkRoles = async (requiredRoles: string[]) => {
	const user = await currentUser();
	if (!user) {
		return false;
	}
	const userRoles = (user.publicMetadata.roles as string[] || []).map((role) => role.toLocaleLowerCase());

	return requiredRoles.some((role) => userRoles.includes(role.toLocaleLowerCase()));
}