import { UnsplashImage } from "@/models";
import Image from "next/image";
import { HeartIcon } from "../icons/HeartIcon";

interface ImageThumbProps {
	image: UnsplashImage;
	index: number;
}

export const ImageThumb: React.FC<ImageThumbProps> = ({ image, index }) => {
	return (
		<>
			<Image
				className="w-full h-full object-cover"
				width={200}
				height={200}
				priority={index < 7}
				src={image.urls.thumb ?? image.urls.small}
				alt={
					image.alt_description ??
					"No alternative description provided"
				}
			></Image>
			<div className="absolute min-h-min w-full left-[calc(100%-68px)] lg:left-[calc(100%-52px)] group-hover:left-0 transition-[left] bottom-0 h-1/5 bg-gradient-to-tr from-blue to-background/90  flex gap-2 items-center justify-between rounded-s-2xl p-2">
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
		</>
	);
};
