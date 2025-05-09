import Navbar from "@/components/UI/Navbar";
import CircleButton from "@/components/UI/Navbar/CircleButton";
import GotoDashboardButton from "@/components/UI/Navbar/GotoDashboardButton";
import LoginButton from "@/components/UI/Navbar/login-button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar
				rightSide={
					<>
						<SignedOut>
							<LoginButton />
						</SignedOut>
						<SignedIn>
							<CircleButton toolTip="User settings...">
								<UserButton />
							</CircleButton>
							<GotoDashboardButton />
						</SignedIn>
					</>
				}
			/>
			{children}
		</>
	);
}
