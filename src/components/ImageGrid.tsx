"use client";

import { FilterContext } from "@/app/filter-provider";
import { Dialog } from "@/components/dialog/Dialog";
import { ErrorResponse, UnsplashImage } from "@/models";
import { filterQueryBuilder } from "@/utils/filterQueryBuilder";
import { isErrors } from "@/utils/typeCheck";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "./loader/Loader";
import { HeartIcon } from "./icons/HeartIcon";

export const ImageGrid = () => {
  // Context State
  const { color, searchQuery, showEmptyQueryError, loading, setLoading } =
    useContext(FilterContext);

  // Component State
  const [data, setData] = useState<UnsplashImage[] | ErrorResponse>([]);
  const [mainImage, setMainImage] = useState<UnsplashImage | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Component Refs
  const imageGrid = useRef<HTMLElement>(null);
  const buttons = useRef(new Map());
  const currentPage = useRef(1);

  const fetchImages = async () => {
    setLoading(true);
    const filterParams = filterQueryBuilder(
      currentPage.current,
      color,
      searchQuery
    );
    const response = await fetch(
      `http://localhost:3000/api/unsplash?${filterParams}`
    );
    const res = await response.json();
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
    setLoading(false);
  };

  const handleImageClick = (image: UnsplashImage) => {
    setMainImage(image);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setMainImage(null);
    setShowDialog(false);
  };

  useEffect(() => {
    if (searchQuery === "") {
      // We cant perform color search without query since its required
      // So we notify the user
      showEmptyQueryError(color !== null);
      if (color !== null) {
        return;
      }
    } else {
      showEmptyQueryError(false);
    }
    // If filterQuery or colors change, clear current results and fetchImages with params
    setData([]);
    currentPage.current = 1;
    fetchImages();
  }, [color, searchQuery]);

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, []);

  useEffect(() => {
    if (buttons.current.size === 0) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        currentPage.current += 1;
        fetchImages();
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
        className="container grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 mt-10"
      >
        <h1 className="text-3xl col-span-full">
          Showing {data.length} photo's
        </h1>
        {data.length === 0 && !loading && (
          <p>
            No results.. try resetting filters:{" "}
            <button className="p-4 border-blue">reset</button>
          </p>
        )}
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
              <Image
                className="w-full h-full object-cover"
                width={200}
                height={200}
                priority={index < 7}
                src={image.urls.thumb ?? image.urls.small}
                alt={image.alt_description}
              ></Image>
              <div className="absolute w-full left-[calc(100%-68px)] lg:left-[calc(100%-52px)] group-hover:left-0 transition-[left] bottom-0 h-1/5 bg-gradient-to-tr from-blue to-background/90  flex gap-2 items-center justify-between rounded-s-2xl p-2">
                <Image
                  className="object-cover rounded-full w-14 h-14 lg:w-10 lg:h-10"
                  width={40}
                  height={40}
                  src={image.user.profile_image.medium}
                  alt={image.user.username}
                ></Image>
                <div className="flex flex-col items-start mr-auto">
                  <p>By author:</p>
                  <p>{image.user.username}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <HeartIcon className="h-6 w-6 text-white" />
                  <p>{image.likes}</p>
                </div>
              </div>
            </button>
          ))}
        {loading && <Loader />}
      </section>
      {mainImage !== null && (
        <Dialog showDialog={showDialog}>
          <header className="absolute top-0 left-0 w-full bg-slate-200/50 flex items-center justify-between p-4">
            <h2 className="text-2xl">
              {mainImage?.alt_description} by {mainImage.user.username}
            </h2>
            <button onClick={() => closeDialog()}>Close</button>
          </header>
          <Image
            alt={mainImage?.alt_description}
            src={mainImage.urls.full}
            width={mainImage.width}
            height={mainImage.height}
            className="w-full h-full object-cover"
          />
        </Dialog>
      )}
    </>
  );
};
