import { type Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { checkRoles } from "@/lib/auth";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { ThemeModeToggle } from "@/components/UI/theme-mode-toggle";

const nunitoSans = Nunito({
	variable: "--font-nunito-sans",
	subsets: ["latin"],
});

const nunitoMono = Nunito_Sans({
	variable: "--font-nunito-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Food mate application with Next.js and Clerk",
	description: "Written by Yashar-Aliabbasi [aliabbasi.yashar@gmail.com]",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${nunitoSans.variable} ${nunitoMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<header className="flex justify-end items-center p-4 gap-4 h-16">
							<SignedOut>
								Signed out
								{(await checkRoles(["UsER", "Admin"])) ? (
									<div className="text-green-500">
										User or admin
									</div>
								) : (
									<div className="text-red-500">
										Not user or admin
									</div>
								)}
								{/* <SignInButton />
							<SignUpButton /> */}
							</SignedOut>
							<SignedIn>
								{(await checkRoles(["UsER", "Admin"])) ? (
									<div className="text-green-500">
										User or admin
									</div>
								) : (
									<div className="text-red-500">
										Not user or admin
									</div>
								)}
								<UserButton />
								<ThemeModeToggle />
							</SignedIn>
						</header>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
