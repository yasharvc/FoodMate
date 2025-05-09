"use client";

import React from "react";
import CircleButton from "./CircleButton";
import { Home } from "lucide-react";

export default function GotoHomeButton() {
	return (
		<CircleButton
			toolTip="Home"
			onClick={() => (window.location.href = "/")}
		>
			<Home />
		</CircleButton>
	);
}
