import { Errors, ErrorSource } from "unsplash-js/dist/helpers/errors";

export interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  instagram_username: string;
  twitter_username: string;
  profile_image: ProfileImage;
  links: UserLinks;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

export interface CurrentUserCollection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: UnsplashImage;
  user: User;
}

export interface ImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface UnsplashImage {
  id: string;
  slug: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: any[];
  user: User;
  current_user_collections: CurrentUserCollection[];
  urls: ImageUrls;
  links: ImageLinks;
  likes: number;
  liked_by_user: boolean;
  sponsorship: any | null;
  topic_submissions: {
    [key: string]: {
      status: string;
      approved_on: string;
    }[];
  };
  asset_type: string;
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    name: string;
    city: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  meta: {
    index: boolean;
  };
  public_domain: boolean;
  tags: {
    type: string;
    title: string;
  }[];
  views: number;
  downloads: number;
  topics: {
    id: string;
    title: string;
    slug: string;
    visibility: string;
  }[];
}

export type ErrorResponse = {
  type: "error";
  source: ErrorSource;
  response?: never;
  originalResponse: Response;
  errors: Errors;
  status: number;
};
