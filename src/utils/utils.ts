import { createApi } from "unsplash-js";

export const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_CLIENT_ID ?? "",
});
