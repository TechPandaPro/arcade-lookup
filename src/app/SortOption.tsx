"use client";

import { useState } from "react";

interface SortOptionProps {
  sortId: string;
  text: string;
  sortBy: 0 | -1 | 1;
  onSortClick: (sortId: string) => void;
}

export default function SortOption({
  sortId,
  text,
  sortBy,
  onSortClick,
}: SortOptionProps) {
  // const [sortBy, setSortBy] = useState<0 | -1 | 1>(0);

  // function handleClick() {
  //   setSortBy(sortBy === -1 ? 1 : -1);
  // }

  function handleClick() {
    onSortClick(sortId);
  }

  // FIXME: consider adjusting button padding
  return (
    // <button aria-label="Sort" title="Sort" onClick={handleClick}>
    <button aria-label="Sort" title="Sort" onClick={handleClick}>
      {text}
      <svg
        className={`w-4 h-4 text-gray-800 dark:text-white inline-block ml-[.1rem] ${sortBy === 0 ? `hidden` : ``} ${sortBy === -1 ? `rotate-180` : ``}`} // prettier-ignore
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>
  );
}
