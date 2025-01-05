import { NextResponse, type NextRequest } from "next/server";
import { ColorId, createApi, OrderBy, SearchOrderBy } from "unsplash-js";

const api = createApi({
  accessKey: process.env.UNSPLASH_CLIENT_ID ?? "",
});

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const color = request.nextUrl.searchParams.get("color") as ColorId;
  const query = request.nextUrl.searchParams.get("query");
  const orderBy = request.nextUrl.searchParams.get("order") as OrderBy;
  const perPage = 22;

  // User performed a search request so the api call is slightly different '.search.getPhotos'
  if (query !== null) {
    const data = await api.search
      .getPhotos({
        query: query ?? "",
        perPage,
        color,
        page,
        orderBy: orderBy as SearchOrderBy,
      })
      .then((result) => {
        if (result.errors) {
          return result;
        } else {
          return result.response.results;
        }
      });
    return NextResponse.json(data);
  } else {
    const data = await api.photos
      .list({ page: page, perPage, orderBy })
      .then((result) => {
        if (result.errors) {
          return result;
        } else {
          return result.response.results;
        }
      });
    return NextResponse.json(data);
  }
}
