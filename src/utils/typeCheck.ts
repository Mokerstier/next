import { ErrorResponse } from "@/models";

export const isErrors = (data: any): data is ErrorResponse => {
  return data.errors !== undefined;
};
