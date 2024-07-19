"use client";

import { useRef } from "react";
import SearchOption from "./SearchOption";

interface TextSearchOptionProps {
  onSearchInput: (term: string | null) => void;
}

export default function TextSearchOption({
  onSearchInput,
}: TextSearchOptionProps) {
  const searchTermRef = useRef<HTMLInputElement | null>(null);

  function handleSearchInput() {
    triggerSearchInput();
  }

  function triggerSearchInput() {
    const searchTerm = searchTermRef.current?.value || null;
    onSearchInput(searchTerm);
  }

  function handleSuppressSearch(doSuppress: boolean) {
    if (doSuppress) onSearchInput(null);
    else triggerSearchInput();
  }

  return (
    <SearchOption onSuppressSearch={handleSuppressSearch}>
      <input
        ref={searchTermRef}
        type="text"
        className="w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100"
        onInput={handleSearchInput}
      />
    </SearchOption>
  );
}
