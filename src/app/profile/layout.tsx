import { Metadata } from "next";

export const metadata: Metadata = {
	title: "User Profile",
	description: "Page to check user profile",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
