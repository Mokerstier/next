import Link from "next/link";
import Image from "next/image";
import { UnsplashImage } from "@/models";

const getData = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/random`);
  const randomImage = await data.json();

  return randomImage as UnsplashImage;
};

export default async function Home() {
  const randomImage = await getData();
  return (
    <>
      <header className="mt-10 md:mt-32 container p-4">
        <h1 className="text-6xl mb-4">
          Welcome to the unsplash photo searcher
        </h1>
        <p>Search for photos from unsplash</p>
        <p>
          Start browsing through the images here:{" "}
          <Link href="/overview">overview</Link>
        </p>
      </header>
      <div className="absolute left-0 top-0 -z-10 min-h-dvh max-h-dvh object-cover w-full bg-gray-950/75 flex flex-col justify-center items-center">
        <p className="pt-20">Random image every visit!</p>
      </div>
      <Image
        className="absolute left-0 top-0 -z-20 min-h-dvh max-h-dvh object-cover w-full"
        src={randomImage.urls.full}
        alt={randomImage.alt_description}
        width={1000}
        height={1000}
      ></Image>

      <footer className="container row-start-3 flex flex-col gap-2 flex-wrap items-start p-4 mt-auto pb-10">
        <p>Do you like this image?</p>
        <p>This image is created by: {randomImage.user.name}</p>
        <p>
          You can follow more of this users work here:{" "}
          <Link href={randomImage.user.links.photos}>
            unsplash user profile
          </Link>
        </p>
        <p className="mx-auto">
          © Created by{" "}
          <Link href="https://heijde-app.vercel.app/">
            Wouter van der Heijde
          </Link>
        </p>
      </footer>
    </>
  );
}
