import { RandomImage } from "@/components/RandomImage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Photo viewer",
	description: "Random image every visit!",
};

export default async function Home() {
	return (
		<>
			<section className="pt-10 md:pt-32 mt-20 container p-4 ">
				<p className="text-blue mb-2 font-bold">
					Search for photos from unsplash
				</p>
				<h1 className="text-4xl lg:text-6xl mb-4 font-bold tracking-wider uppercase max-w-[800px]">
					Welcome to the unsplash photo searcher
				</h1>
				<p>
					Start browsing through the images here:{" "}
					<Link className="text-white underline" href="/overview">
						overview
					</Link>
				</p>
			</section>
			<div className="absolute left-0 top-0 -z-10 min-h-dvh max-h-dvh object-cover w-full bg-gray-950/75 flex flex-col justify-center items-center">
				<p className="pt-20">Random image every visit!</p>
			</div>
			<RandomImage />
		</>
	);
}

