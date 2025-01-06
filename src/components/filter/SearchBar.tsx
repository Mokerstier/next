"use client";
import { FilterContext } from "@/app/filter-provider";
import { DELAY } from "@/constants/Filter";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchIcon } from "../icons/SearchIcon";

export const SearchBar = () => {
	const { emptyQueryError, setSearchQuery, setLoading } =
		useContext(FilterContext);

	const [query, setQuery] = useState("");

	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const focusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			setLoading(true);
			setSearchQuery(query);
		}, DELAY.LG);

		return () => {
			clearTimeout(handler);
		};
	}, [query, setSearchQuery, setLoading]);

	return (
		<>
			<h3 className="my-2 font-semibold">Search on keywords</h3>
			<button
				onClick={focusInput}
				className={`px-4 py-2 bg-white text-black rounded-md flex w-full relative border border-slate-500 items-center transition-all ${
					emptyQueryError ? "mb-10" : "mb-2"
				}`}
			>
				<label
					aria-label="Start searching"
					className="-ml-2 mr-2"
					htmlFor="query"
				>
					<SearchIcon className="w-6 h-6 text-slate-600" />
				</label>
				<input
					ref={inputRef}
					className="w-full focus:outline-none"
					onChange={handleSearch}
					type="text"
					name="query"
					id="query"
					placeholder="Search photos by keyword"
				/>
				{emptyQueryError && (
					<span className="text-orange-400 absolute -bottom-8 left-0 animate-fade-in">
						Must provide a searchterm
					</span>
				)}
			</button>
		</>
	);
};
