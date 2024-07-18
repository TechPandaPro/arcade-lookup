"use client";

import { useRef } from "react";
import SearchOption from "./SearchOption";

interface StampRangeSearchOptionProps {
  onSearchInput: (from: number | null, to: number | null) => void;
}

export default function StampRangeSearchOption({
  onSearchInput,
}: StampRangeSearchOptionProps) {
  const dateFromRef = useRef<HTMLInputElement | null>(null);
  const dateToRef = useRef<HTMLInputElement | null>(null);

  function handleSearchInput() {
    const dateFromStr = dateFromRef.current?.value;
    const dateToStr = dateToRef.current?.value;

    const dateFrom = dateFromStr
      ? new Date(dateFromStr).getTime() || null
      : null;
    const dateTo = dateToStr ? new Date(dateToStr).getTime() || null : null;

    onSearchInput(dateFrom, dateTo);
  }

  return (
    <SearchOption>
      <label htmlFor="dateFrom" className="block text-xs text-left mb-1">
        From:
      </label>
      <input
        ref={dateFromRef}
        id="dateFrom"
        type="datetime-local"
        className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
        onInput={handleSearchInput}
      />
      <label htmlFor="dateTo" className="block text-xs text-left my-1">
        To:
      </label>
      <input
        ref={dateToRef}
        id="dateTo"
        type="datetime-local"
        className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
        // onInput={onSearchInput}
      />
    </SearchOption>
  );
}
