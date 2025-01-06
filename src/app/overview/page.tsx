import { ImageGrid } from "@/components/ImageGrid";
import FilterProvider from "../filter-provider";
import { FilterBar } from "@/components/filter/FilterBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Overview",
	description: "Browse a collection of images from Unsplash",
};

export default async function Overview() {
	return (
		<FilterProvider>
			<section className="grid lg:grid-cols-4 container relative">
				<FilterBar />
				<ImageGrid />
			</section>
		</FilterProvider>
	);
}

