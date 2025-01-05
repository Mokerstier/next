"use client";
import { SearchBar } from "@/components/filter/SearchBar";
import { Filter } from "@/components/filter/Filter";
import { FilterIcon } from "../icons/FilterIcon";
import { useState } from "react";

export const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`flex flex-col p-4 pb-10 bg-background z-10 w-[300px] min-h-dvh fixed top-0 transition-all border-r border-color-white ${
        isOpen ? "left-0" : "-left-[300px]"
      }`}
    >
      <div className="relative -z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Show filters"
          className="absolute bg-background rounded-e-lg p-3 -right-[73px] lg:top-0 top-16 border-e border-white border-b border-t"
        >
          <FilterIcon className="w-8 h-8" />
        </button>
      </div>
      <SearchBar />
      <Filter />
    </aside>
  );
};
