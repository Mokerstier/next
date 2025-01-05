"use client";
import { UnsplashImage } from "@/models";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const getData = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/random`);
  const randomImage = await data.json();

  return randomImage as UnsplashImage;
};

export const RandomImage = () => {
  const [randomImage, setRandomImage] = useState<UnsplashImage>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await getData();
        setRandomImage(image);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {randomImage && (
        <Image
          className="absolute left-0 top-0 -z-20 min-h-dvh max-h-dvh object-cover w-full"
          src={randomImage.urls.full}
          alt={randomImage.alt_description}
          width={1000}
          height={1000}
        ></Image>
      )}
      <footer className="relative pb-20 pt-32 mt-auto w-full -mb-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 -skew-y-[8deg] h-[200%] bg-blue -z-10"></div>
        <div className="container row-start-3 flex flex-col flex-wrap items-start p-4">
          {randomImage && (
            <>
              <p>Do you like this image?</p>
              <p>This image is created by: {randomImage.user.name}</p>
              <p>
                You can follow more of this users work here:{" "}
                <Link
                  className="link"
                  href={randomImage?.user.links.photos ?? "#"}
                >
                  unsplash user profile
                </Link>
              </p>
            </>
          )}
          <p className="mx-auto mt-20">
            © Created by{" "}
            <Link className="link" href="https://heijde-app.vercel.app/">
              Wouter van der Heijde
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};
