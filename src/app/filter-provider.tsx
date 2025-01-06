"use client";

import { UnsplashImage, ErrorResponse } from "@/models";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ColorId } from "unsplash-js";

interface FilterContextType {
	data: UnsplashImage[] | ErrorResponse;
	setData: Dispatch<SetStateAction<UnsplashImage[] | ErrorResponse>>;
	color: ColorId | null;
	setColor: Dispatch<SetStateAction<ColorId | null>>;
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	emptyQueryError: boolean;
	showEmptyQueryError: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	totalResults: number;
	setTotalResults: Dispatch<SetStateAction<number>>;
}

export const FilterContext = createContext<FilterContextType>({
	data: [],
	setData: () => {},
	color: null,
	setColor: () => {},
	searchQuery: "",
	setSearchQuery: () => {},
	emptyQueryError: false,
	showEmptyQueryError: () => {},
	loading: false,
	setLoading: () => {},
	totalResults: 0,
	setTotalResults: () => {},
});

export default function FilterProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [color, setColor] = useState<ColorId | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [emptyQueryError, showEmptyQueryError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [totalResults, setTotalResults] = useState<number>(0);
	const [data, setData] = useState<UnsplashImage[] | ErrorResponse>([]);

	return (
		<FilterContext.Provider
			value={{
				color,
				setColor,
				searchQuery,
				setSearchQuery,
				emptyQueryError,
				showEmptyQueryError,
				loading,
				setLoading,
				totalResults,
				setTotalResults,
				data,
				setData,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}
