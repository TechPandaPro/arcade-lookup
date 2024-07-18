"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import SearchButton from "./SearchButton";

interface SearchOptionsProps {
  children: ReactNode;
}

export default function SearchOptions({ children }: SearchOptionsProps) {
  const [taskSearchShowing, setTaskSearchShowing] = useState(false);
  const taskSearch = useRef<null | HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  function onTaskButtonClick() {
    setTaskSearchShowing(!taskSearchShowing);
  }

  useEffect(() => {
    if (taskSearch.current) setContentHeight(taskSearch.current.scrollHeight);
  }, [children]);

  return (
    <>
      <SearchButton onButtonClick={onTaskButtonClick} />
      {/* <div className={taskSearchShowing ? `block` : `hidden`}>{children}</div> */}
      <div
        ref={taskSearch}
        className={`overflow-hidden transition-all duration-200 ease-out`}
        style={{
          height: taskSearchShowing ? `${contentHeight}px` : `0`,
        }}
      >
        {children}
      </div>
    </>
  );

  // from original SearchOptions.tsx component, for reference
  // if (type === "text")
  //   // prettier-ignore
  //   return (
  //     <>
  //       <SearchButton onButtonClick={onTaskButtonClick} />
  //       <input
  //         type="text"
  //         className={`${taskSearchShowing ? `block` : `hidden`} w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-sm font-normal transition-all duration-100`}
  //       />
  //     </>
  //   );
  // else if (type === "stampRange")
  //   return (
  //     <>
  //       <SearchButton onButtonClick={onTaskButtonClick} />
  //       <div className={taskSearchShowing ? "" : "hidden"}>
  //         <label htmlFor="dateFrom" className="block text-xs text-left mb-1">
  //           From:
  //         </label>
  //         <input
  //           id="dateFrom"
  //           type="datetime-local"
  //           className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
  //         />
  //         <label htmlFor="dateTo" className="block text-xs text-left my-1">
  //           To:
  //         </label>
  //         <input
  //           id="dateTo"
  //           type="datetime-local"
  //           className="block w-0 min-w-full bg-transparent border-2 border-gray-500 focus:border-gray-100 outline-none rounded-md px-2 py-1 text-xs font-normal transition-all duration-100 color-scheme-dark"
  //         />
  //       </div>
  //     </>
  //   );
}
