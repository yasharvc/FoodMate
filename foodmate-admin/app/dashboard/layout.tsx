import DashboardNavbar from "@/components/UI/DashboardNavbar";
import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<DashboardNavbar />
			{children}
		</>
	);
}
