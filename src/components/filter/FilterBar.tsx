"use client";
import { SearchBar } from "@/components/filter/SearchBar";
import { Filter } from "@/components/filter/Filter";
import { useState } from "react";
import { SlidersIcon } from "../icons/SlidersIcon";

export const FilterBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<aside
			className={`flex flex-col p-4 pb-10 bg-background z-30 w-[300px] lg:border-none lg:bg-transparent lg:pt-16 lg:mt-10 min-h-dvh fixed top-0 lg:left-10 lg:w-1/4 transition-all border-r border-color-white ${
				isOpen ? "left-0" : "-left-[300px]"
			}`}
		>
			<div className="relative -z-10 lg:hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Show filters"
					className="absolute bg-background rounded-e-lg p-2 -right-[57px] lg:top-12 top-16 border-e border-white border-b border-t"
				>
					<SlidersIcon className="w-6 h-6" />
				</button>
			</div>
			<SearchBar />
			<Filter />
		</aside>
	);
};

