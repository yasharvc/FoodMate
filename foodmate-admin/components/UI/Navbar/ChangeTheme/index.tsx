"use client";
import { isThemeDark } from "@/lib/daisyUtil";
import React from "react";

export default function ChangeTheme({
	name,
	title = name,
}: {
	name: string;
	title?: string;
}) {
	//TODO: Set the user active theme in the database and get it from there
	return (
		<button
			onClick={() => {
				const isDark = isThemeDark(
					document.body.dataset.theme || "light"
				);
				const isSelectedThemeDark = isThemeDark(name);

				document.body.dataset.theme = name;
				document.cookie = `theme=${name}; path=/; max-age=31536000;`;
				if (isSelectedThemeDark != isDark) {
					window.location.reload();
				}
			}}
		>
			{title}
		</button>
	);
}
