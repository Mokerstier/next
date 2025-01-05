import { NextResponse, type NextRequest } from "next/server";
import { unsplashApi } from "../utils";

export async function GET(request: NextRequest) {
  const data = await unsplashApi.photos.getRandom({}).then((result) => {
    if (result.errors) {
      return result;
    } else {
      return result.response;
    }
  });
  return NextResponse.json(data);
}
