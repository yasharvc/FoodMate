import { signJwt } from "@/lib/jwt";
import { currentUser } from "@clerk/nextjs/server";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function GET () {
	const cookieStore = await cookies();

	const user = await currentUser();
	if (!user) {
		return new Response(
			JSON.stringify({ message: "User not found" }),
			{
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
	}
	const serialized = serialize("jwt", signJwt(
		{
			ic: user.id,
			roles: user.publicMetadata.roles || [],
			firstName: user.firstName,
			lastName: user.lastName,
		}, process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 60
	), {
		httpOnly: true,
		maxAge: 60 * (process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 60),
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});

	return new Response(
		JSON.stringify({ message: JSON.stringify(cookieStore.getAll()) }),
		{
			status: 200,
			headers: {
				"Set-Cookie": serialized,
				"Content-Type": "application/json",
			},
		});
}