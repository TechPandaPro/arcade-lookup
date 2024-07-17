"use client";

import { useState } from "react";
import SearchButton from "./SearchButton";

export default function SearchOptions() {
  const [taskSearchShowing, setTaskSearchShowing] = useState(false);

  function onTaskButtonClick() {
    setTaskSearchShowing(!taskSearchShowing);
  }

  return (
    <>
      <SearchButton onButtonClick={onTaskButtonClick} />
      {taskSearchShowing ? (
        <input
          type="datetime-local"
          className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100 color-scheme-dark"
        ></input>
      ) : (
        ""
      )}
    </>
  );
}
