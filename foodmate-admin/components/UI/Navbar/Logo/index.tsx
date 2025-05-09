"use client";

import { isThemeDark } from "@/lib/daisyUtil";
import Image from "next/image";
import React from "react";

function getCookieValue(name: string) {
	if (typeof document === "undefined") return;
	const regex = new RegExp(`(^| )${name}=([^;]+)`);
	const match = document?.cookie.match(regex);
	if (match) {
		return match[2];
	}
}

export default function Logo() {
	const theme = getCookieValue("theme") || "light";
	return (
		<Image
			className="rounded-lg"
			src={`/images/logo-${isThemeDark(theme) ? "white" : "black"}.png`}
			alt="logo"
			width={64}
			height={64}
		/>
	);
}
