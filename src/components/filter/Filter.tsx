"use client";

import { FilterContext } from "@/app/filter-provider";
import { FILTER_COLORS } from "@/constants/Filter";
import { useContext } from "react";

import type { ColorId } from "unsplash-js";

export const Filter = () => {
  const { color, setColor } = useContext(FilterContext);

  const toggleFilter = (newColor: ColorId) => {
    if (color === newColor) {
      setColor(null);
    } else {
      setColor(newColor);
    }
  };

  return (
    <div className="border-y border-white pt-2 pb-4">
      <h3 className="mb-2 font-semibold">Filter by color</h3>
      <div className="flex gap-2 flex-wrap">
        {FILTER_COLORS.map((colorId) => (
          <button
            aria-selected={color === colorId}
            onClick={() => toggleFilter(colorId)}
            className={`rounded-md px-4 py-2 border  ${
              color === colorId
                ? "bg-blue border-background text-foreground font-bold"
                : "bg-foreground border-blue text-background"
            }`}
            key={colorId}
          >
            {colorId.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
};
