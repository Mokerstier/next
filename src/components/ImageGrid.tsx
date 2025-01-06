"use client";

import { FilterContext } from "@/app/filter-provider";
import { Dialog } from "@/components/dialog/Dialog";
import { ErrorResponse, UnsplashImage } from "@/models";
import { isErrors } from "@/utils/typeCheck";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Loader } from "./loader/Loader";
import Link from "next/link";
import { CloseIcon } from "./icons/CloseIcon";
import debounce from "lodash.debounce";
import { useFetchImages } from "@/hooks/useFetchImages";
import { resetFilters } from "@/utils/imageGridUtils";
import { ImageThumb } from "./cards/ImageThumb";

export const ImageGrid = () => {
	// Context State
	const {
		color,
		searchQuery,
		loading,
		setSearchQuery,
		setColor,
		showEmptyQueryError,
	} = useContext(FilterContext);

	// Component State
	const [data, setData] = useState<UnsplashImage[] | ErrorResponse>([]);
	const [mainImage, setMainImage] = useState<UnsplashImage | null>(null);
	const [showDialog, setShowDialog] = useState(false);
	const [stopObserving, setStopObserving] = useState(false);
	const [fetchError, setFetchError] = useState<string | null>(null);

	// Component Refs
	const imageGrid = useRef<HTMLElement>(null);
	const buttons = useRef(new Map());
	const currentPage = useRef(1);

	// Hooks
	const fetchImages = useFetchImages(
		setFetchError,
		setStopObserving,
		currentPage,
		setData
	);

	const debouncedFetchImages = useCallback(debounce(fetchImages, 300), [
		fetchImages,
	]);

	const handleImageClick = (image: UnsplashImage) => {
		setMainImage(image);
		setShowDialog(true);
	};

	const closeDialog = () => {
		setMainImage(null);
		setShowDialog(false);
	};

	useEffect(() => {
		// When user is performing a search clear current data and reset page to 1
		if (searchQuery !== "") {
			setData([]);
			currentPage.current = 1;
		}
		if (color === null) {
			showEmptyQueryError(false);
		}
	}, [searchQuery, color]);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	useEffect(() => {
		if (stopObserving) return;
		if (buttons.current.size === 0) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				currentPage.current += 1;
				debouncedFetchImages();
			}
		});

		const buttonsArray = Array.from(buttons.current.values());
		// Observe the second last button in the array we want to start fetching before the user reaches the bottom of the page
		observer.observe(buttonsArray[buttonsArray.length - 3]);

		return () => {
			observer.disconnect();
		};
	});

	if (isErrors(data)) {
		return <div>Error: {data.errors.join(", ")}</div>;
	}

	return (
		<>
			<section
				ref={imageGrid}
				className="container grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 pt-16 mt-10 px-4"
			>
				{data.length > 0 &&
					data.map((image, index) => (
						<button
							ref={(el) => {
								if (el !== null) {
									buttons.current.set(image.id, el);
								} else {
									buttons.current.delete(image.id);
								}
							}}
							title={`Click to enlarge ${image.alt_description}`}
							aria-label="Click to enlarge"
							onClick={() => handleImageClick(image)}
							className="aspect-video md:w-full md:aspect-square relative overflow-hidden group rounded-2xl"
							key={image.id}
						>
							<ImageThumb image={image} index={index} />
						</button>
					))}
				{fetchError && (
					<p className="col-span-full text-orange-600 p-10 border border-orange-600 rounded-2xl text-center">
						{fetchError}
					</p>
				)}
				{data.length === 0 && !loading && (
					<div className="col-span-full text-center">
						<p>No results.. try resetting filters</p>
						<button
							onClick={() =>
								resetFilters(
									setSearchQuery,
									setColor,
									currentPage
								)
							}
							className="py-2 px-4 rounded-lg mt-2 border-blue border bg-background"
						>
							reset
						</button>
					</div>
				)}
				{loading && <Loader />}
			</section>
			{mainImage !== null && (
				<Dialog showDialog={showDialog}>
					<header className="absolute top-0 left-0 w-full bg-background flex items-center justify-between p-4 text-white">
						<h2 className="text-xl ">
							{mainImage?.alt_description} by{" "}
							<Link
								className="link"
								href={mainImage.user.links.portfolio}
							>
								{mainImage.user.username}
							</Link>
						</h2>
						<button
							aria-label="Close dialog"
							onClick={() => closeDialog()}
						>
							<CloseIcon className="h-6 w-6" />
						</button>
					</header>
					<Image
						alt={mainImage?.alt_description}
						src={mainImage.urls.full}
						width={mainImage.width}
						height={mainImage.height}
						className="w-full h-full object-contain"
					/>
				</Dialog>
			)}
		</>
	);
};

