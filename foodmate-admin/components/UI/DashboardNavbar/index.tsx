import React from "react";
import Navbar from "../Navbar";
import GotoHomeButton from "../Navbar/GotoHomeButton";

export default function DashboardNavbar() {
	return (
		<Navbar
			rightSide={
				<>
					<GotoHomeButton />
				</>
			}
		/>
	);
}
