import { NextResponse, type NextRequest } from "next/server";
import { ColorId, OrderBy, SearchOrderBy } from "unsplash-js";
import { unsplashApi } from "../../../utils/utils";

export async function GET(request: NextRequest) {
	const page = Number(request.nextUrl.searchParams.get("page"));
	const color = request.nextUrl.searchParams.get("color") as ColorId;
	const query = request.nextUrl.searchParams.get("query");
	const orderBy = request.nextUrl.searchParams.get("order") as OrderBy;
	const perPage = 22;

	// User performed a search request so the api call is slightly different '.search.getPhotos'
	if (query !== null) {
		try {
			const data = await unsplashApi.search
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
		} catch (_) {
			return NextResponse.json({ message: "Rate limit exceeded" });
		}
	} else {
		try {
			const data = await unsplashApi.photos
				.list({ page: page, perPage, orderBy })
				.then((result) => {
					if (result.errors) {
						return result;
					} else {
						return result.response.results;
					}
				});
			return NextResponse.json(data);
		} catch (_) {
			return NextResponse.json({ message: "Rate limit exceeded" });
		}
	}
}

