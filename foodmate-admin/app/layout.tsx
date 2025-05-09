import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { cookies } from "next/headers";

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
	const theme = (await cookies()).get("theme")?.value || "light";
	return (
		<ClerkProvider>
			<html suppressHydrationWarning>
				<body
					className={`${nunitoSans.variable} ${nunitoMono.variable} antialiased`}
					data-theme={theme}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
