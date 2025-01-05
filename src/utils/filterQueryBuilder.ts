import { ColorId } from "unsplash-js";

export const filterQueryBuilder = (
  page?: number,
  color?: ColorId | null,
  search?: string
) => {
  const queryParams: string[] = [];

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (color) {
    queryParams.push(`color=${color}`);
  }

  if (search) {
    queryParams.push(`query=${search}`);
  }

  return queryParams.join("&");
};
