"use client";
import { FilterContext } from "@/app/filter-provider";
import { DELAY } from "@/constants/Filter";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchIcon } from "../icons/SearchIcon";

export const SearchBar = () => {
  const { emptyQueryError, setSearchQuery, setLoading } =
    useContext(FilterContext);

  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);
      setSearchQuery(query);
    }, DELAY.MD);

    return () => {
      clearTimeout(handler);
    };
  }, [query, setSearchQuery]);

  return (
    <button
      onClick={focusInput}
      className="px-4 py-2 bg-white text-black mt-4 rounded-md flex w-full relative border border-slate-500 items-center"
    >
      <label aria-label="Start searching" className="mr-2" htmlFor="query">
        <SearchIcon className="w-6 h-6 text-slate-600" />
      </label>
      <input
        ref={inputRef}
        className="w-full"
        onChange={handleSearch}
        type="text"
        name="query"
        id="query"
        placeholder="Search photos by keyword"
      />
      {emptyQueryError && (
        <span className="text-orange-400 absolute -bottom-8 left-0">
          Must provide a searchterm
        </span>
      )}
    </button>
  );
};
