"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ColorId } from "unsplash-js";

interface FilterContextType {
  color: ColorId | null;
  setColor: Dispatch<SetStateAction<ColorId | null>>;
  searchQuery: string | undefined;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  emptyQueryError: boolean;
  showEmptyQueryError: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const FilterContext = createContext<FilterContextType>({
  color: null,
  setColor: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  emptyQueryError: false,
  showEmptyQueryError: () => {},
  loading: false,
  setLoading: () => {},
});

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [color, setColor] = useState<ColorId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [emptyQueryError, showEmptyQueryError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{
        color,
        setColor,
        searchQuery,
        setSearchQuery,
        emptyQueryError,
        showEmptyQueryError,
        loading,
        setLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
