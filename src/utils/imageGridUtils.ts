import { Dispatch, RefObject, SetStateAction } from "react";
import { ColorId } from "unsplash-js";

export const resetFilters = (
	setSearchQuery: Dispatch<SetStateAction<string>>,
	setColor: Dispatch<SetStateAction<ColorId | null>>,
	currentPage: RefObject<number>
) => {
	setSearchQuery("");
	setColor(null);
	currentPage.current = 1;
};

export const clearError = (
	setFetchError: Dispatch<SetStateAction<string | null>>,
	setStopObserving: Dispatch<SetStateAction<boolean>>
) => {
	setFetchError(null);
	setStopObserving(false);
};
