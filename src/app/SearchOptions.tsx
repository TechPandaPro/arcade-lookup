"use client";

import { useState } from "react";
import SearchButton from "./SearchButton";

interface SearchOptionsProps {
  type: "text" | "stampRange";
}

export default function SearchOptions({ type }: SearchOptionsProps) {
  const [taskSearchShowing, setTaskSearchShowing] = useState(true);

  function onTaskButtonClick() {
    setTaskSearchShowing(!taskSearchShowing);
  }

  if (type === "text")
    // prettier-ignore
    return (
      <>
        <SearchButton onButtonClick={onTaskButtonClick} />
          <input
            type="text"
            className={`${taskSearchShowing ? `block` : `hidden`} w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100`}
          />
      </>
    );
  else if (type === "stampRange")
    // return (
    //   <>
    //     <SearchButton onButtonClick={onTaskButtonClick} />
    //     {taskSearchShowing ? (
    //       <div className="flex gap-1">
    //         <input
    //           type="datetime-local"
    //           className="w-0 flex-grow bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100 color-scheme-dark"
    //         ></input>
    //         <input
    //           type="datetime-local"
    //           className="w-0 flex-grow bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100 color-scheme-dark"
    //         ></input>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </>
    // );
    return (
      <>
        <SearchButton onButtonClick={onTaskButtonClick} />
        <div className={taskSearchShowing ? "" : "hidden"}>
          <label htmlFor="dateFrom" className="block text-xs text-left mb-1">
            From:
          </label>
          <input
            id="dateFrom"
            type="datetime-local"
            className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
          />
          <label htmlFor="dateTo" className="block text-xs text-left my-1">
            To:
          </label>
          <input
            id="dateTo"
            type="datetime-local"
            className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
          />
        </div>
      </>
    );
}
