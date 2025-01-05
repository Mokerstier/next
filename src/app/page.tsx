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
        <h1 className="text-4xl lg:text-6xl mb-4">
          Welcome to the unsplash photo searcher
        </h1>
        <p>Search for photos from unsplash</p>
        <p>
          Start browsing through the images here:{" "}
          <Link className="text-white underline" href="/overview">
            overview
          </Link>
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

      <footer className="relative pb-20 pt-32 mt-auto w-full -mb-20 bg-gradient-to-b from-transparent to-blue">
        <div className="absolute top-0 left-0 right-0 bottom-0 -skew-y-[8deg] h-[200%] bg-blue -z-10"></div>
        <div className="container row-start-3 flex flex-col flex-wrap items-start p-4">
          <p>Do you like this image?</p>
          <p>This image is created by: {randomImage.user.name}</p>
          <p>
            You can follow more of this users work here:{" "}
            <Link
              className="text-white underline hover:text-slate-900 transition-colors"
              href={randomImage.user.links.photos}
            >
              unsplash user profile
            </Link>
          </p>
          <p className="mx-auto mt-20">
            © Created by{" "}
            <Link
              className="text-white underline hover:text-slate-900 transition-colors"
              href="https://heijde-app.vercel.app/"
            >
              Wouter van der Heijde
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
