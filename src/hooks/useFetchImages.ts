import { FilterContext } from "@/app/filter-provider";
import { ToastContext } from "@/app/toast-provider";
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
	currentPage: RefObject<number>
) => {
	const {
		color,
		searchQuery,
		showEmptyQueryError,
		setLoading,
		totalResults,
		setData,
	} = useContext(FilterContext);
	const { setToastContent, setShowToast } = useContext(ToastContext);

	return useCallback(async () => {
		// Break out the fetch if user slects a color without filling in a searchterm
		if (color !== null && searchQuery === "") {
			showEmptyQueryError(color !== null);
			return;
		}

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
			setToastContent(res.message);
			setShowToast(true);
			setLoading(false);
			return;
		}

		// If response contains no images stop dataUpdates and show error
		if (res.length === 0) {
			setToastContent(
				totalResults === 0
					? "No results to display"
					: "Your search returned no more results"
			);
			setShowToast(true);
			setStopObserving(true);
			setLoading(false);
			return;
		}

		setData((prevImages) => {
			const newArray = !isErrors(prevImages)
				? [...prevImages, ...res]
				: [...res];

			// Filter duplicates for some reason unsplash sends duplicates when performing paginated requests
			const deDuped = newArray.filter(
				(image, index, self) =>
					self.findIndex((t) => t.id === image.id) === index
			);
			return deDuped;
		});

		clearError(setFetchError, setStopObserving);
		setLoading(false);
	}, [
		color,
		searchQuery,
		setLoading,
		showEmptyQueryError,
		setData,
		currentPage,
		setFetchError,
		setStopObserving,
		setToastContent,
		setShowToast,
		totalResults,
	]);
};
