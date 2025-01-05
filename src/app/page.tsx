import { RandomImage } from "@/components/RandomImage";
import Link from "next/link";

export default async function Home() {
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
      <RandomImage />
    </>
  );
}
