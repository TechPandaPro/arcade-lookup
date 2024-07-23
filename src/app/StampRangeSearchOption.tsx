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
    triggerSearchInput();
  }

  function triggerSearchInput() {
    const dateFromStr = dateFromRef.current?.value;
    const dateToStr = dateToRef.current?.value;

    const dateFrom = dateFromStr
      ? new Date(dateFromStr).getTime() || null
      : null;
    const dateTo = dateToStr ? new Date(dateToStr).getTime() || null : null;

    onSearchInput(dateFrom, dateTo);
  }

  function handleSuppressSearch(doSuppress: boolean) {
    if (doSuppress) onSearchInput(null, null);
    else triggerSearchInput();
  }

  return (
    <SearchOption onSuppressSearch={handleSuppressSearch}>
      <label htmlFor="dateFrom" className="block text-xs text-left mb-1">
        From:
      </label>
      <input
        ref={dateFromRef}
        id="dateFrom"
        type="datetime-local"
        className="block w-0 min-w-full bg-transparent border-2 border-gray-300 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-inherit firefox:tracking-[-0.5px]"
        onInput={handleSearchInput}
      />
      <label htmlFor="dateTo" className="block text-xs text-left my-1">
        To:
      </label>
      <input
        ref={dateToRef}
        id="dateTo"
        type="datetime-local"
        className="block w-0 min-w-full bg-transparent border-2 border-gray-300 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-inherit firefox:tracking-[-0.5px] mb-2"
        onInput={handleSearchInput}
      />
    </SearchOption>
  );
}
