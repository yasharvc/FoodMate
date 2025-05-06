import jwt from "jsonwebtoken";
import { error } from "./offlineLogger";

const jwtSecret = process.env.JWT_SECRET || ""; // set securely in production

export function signJwt (payload: object, expiresInMinutes = -1) {
	if (expiresInMinutes < 0)
		expiresInMinutes = parseInt(process.env.JWT_EXPIRATION || "0")
	return jwt.sign(
		{
			...payload,
			exp: Math.floor(Date.now() / 1000) + (expiresInMinutes * 60),
			iat: Math.floor(Date.now() / 1000),
		}, jwtSecret);
}

export function verifyJwt<T = unknown> (token: string): T | null {
	try {
		return jwt.verify(token, jwtSecret) as T;
	} catch (err) {
		error(`JWT verification error: ${err}`);
		return null;
	}
}
