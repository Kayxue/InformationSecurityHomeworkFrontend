import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Update Password",
	description: "UPdate user password",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
