import { FilterContext } from "@/app/filter-provider";
import { useContext } from "react";

export const ActiveFilters = () => {
	const { color, searchQuery, totalResults } = useContext(FilterContext);

	return (
		<div className="w-full border-b border-white pt-2 pb-4">
			<h2 className="mb-2 font-semibold">Active filters</h2>
			<ul>
				{searchQuery && <li>Keyword: {searchQuery}</li>}
				{color && <li>Color: {color}</li>}
				<li>Results shown: {totalResults}</li>
			</ul>
		</div>
	);
};
