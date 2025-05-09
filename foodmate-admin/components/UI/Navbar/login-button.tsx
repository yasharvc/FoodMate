"use client";
import React from "react";
import { LogIn } from "lucide-react";

export default function LoginButton() {
	return (
		<button
			style={{ cursor: "pointer" }}
			onClick={() => {
				window.location.href = "./dashboard/sign-in";
			}}
		>
			<LogIn className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<LogIn className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Log in</span>
		</button>
	);
}
