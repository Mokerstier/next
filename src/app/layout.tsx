import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import ToastProvider from "./toast-provider";
import { Toast } from "@/components/toast/Toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ToastProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Header />
					<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full min-h-dvh overflow-hidden relative">
						{children}
						<Toast />
					</main>
				</body>
			</ToastProvider>
		</html>
	);
}

