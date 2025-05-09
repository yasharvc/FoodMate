"use client";
import { ChartPie } from "lucide-react";
import React from "react";
import CircleButton from "./CircleButton";

export default function GotoDashboardButton() {
	return (
		<CircleButton
			toolTip="Dashboard"
			onClick={() => (window.location.href = "/dashboard")}
		>
			<ChartPie />
		</CircleButton>
	);
}
