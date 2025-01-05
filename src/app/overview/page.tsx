import { ImageGrid } from "@/components/ImageGrid";
import FilterProvider from "../filter-provider";
import { FilterBar } from "@/components/filter/FilterBar";

export default async function Overview() {
  return (
    <FilterProvider>
      <FilterBar />
      <ImageGrid />
    </FilterProvider>
  );
}
