"use client";
import Link from "next/link";
import { LogoIcon } from "../icons/LogoIcon";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const currentPath = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={`px-4 fixed top-0 z-30 transition-all w-full ${
				isScrolled ? "py-0 bg-background" : "py-5"
			}`}
		>
			<nav className="container">
				<ul className="flex flex-row items-center justify-between">
					<Link
						className={`transition-[padding] max-w-max ${
							isScrolled ? "py-4" : " py-1"
						}`}
						aria-label="Navigate to home"
						href="/"
					>
						<LogoIcon className="h-6 md:h-8 lg:w-full" />
					</Link>
					<Link
						className={`navigation__link ${
							currentPath === "/overview" ? "active" : ""
						} `}
						href="/overview"
					>
						Overview
					</Link>
				</ul>
			</nav>
		</header>
	);
};
