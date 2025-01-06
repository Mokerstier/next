import { FilterContext } from "@/app/filter-provider";
import { ErrorResponse, UnsplashImage } from "@/models";
import { filterQueryBuilder } from "@/utils/filterQueryBuilder";
import { clearError } from "@/utils/imageGridUtils";
import { isErrors } from "@/utils/typeCheck";
import {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useContext,
} from "react";

export const useFetchImages = (
	setFetchError: Dispatch<SetStateAction<string | null>>,
	setStopObserving: Dispatch<SetStateAction<boolean>>,
	currentPage: RefObject<number>,
	setData: Dispatch<SetStateAction<ErrorResponse | UnsplashImage[]>>
) => {
	const { color, searchQuery, showEmptyQueryError, setLoading } =
		useContext(FilterContext);

	return useCallback(async () => {
		// Break out the fetch if user slects a color without filling in a searchterm
		if (color !== null && searchQuery === "") {
			showEmptyQueryError(color !== null);
			return;
		}

		setLoading(true);

		const filterParams = filterQueryBuilder(
			currentPage.current,
			color,
			searchQuery
		);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/unsplash?${filterParams}`
		);
		const res = await response.json();

		// If response contains an error message stop dataUpdates and show error
		if (res.message) {
			setStopObserving(true);
			setFetchError(res.message);
			setLoading(false);
			return;
		}

		// If response contains no images stop dataUpdates and show error
		if (res.length === 0) {
			setFetchError("Your search returned no more results");
			setStopObserving(true);
			setLoading(false);
			return;
		}

		setData((prevImages) => {
			const newArray = !isErrors(prevImages)
				? [...prevImages, ...res]
				: [...res];
			// Filter duplicates for some reason unsplash sends duplicates when performing paginated requests
			return newArray.filter(
				(image, index, self) =>
					self.findIndex((t) => t.id === image.id) === index
			);
		});
		clearError(setFetchError, setStopObserving);
		setLoading(false);
	}, [color, searchQuery, setLoading, showEmptyQueryError]);
};
