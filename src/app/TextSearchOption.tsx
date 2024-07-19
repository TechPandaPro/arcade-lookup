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

  // FIXME: figure out why this causes input to move in from wrong side
  function handleAppear() {
    if (searchTermRef.current) searchTermRef.current.focus();
  }

  return (
    <SearchOption
      onSuppressSearch={handleSuppressSearch}
      onAppear={handleAppear}
    >
      <input
        ref={searchTermRef}
        type="text"
        className="w-0 min-w-full bg-transparent border-2 border-gray-300 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100 mb-2 float-end"
        onInput={handleSearchInput}
      />
    </SearchOption>
  );
}
