"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import SearchButton from "./SearchButton";

interface SearchOptionsProps {
  children: ReactNode;
}

export default function SearchOptions({ children }: SearchOptionsProps) {
  const [taskSearchShowing, setTaskSearchShowing] = useState(false);
  const taskSearchRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  function handleTaskButtonClick() {
    if (taskSearchRef.current) {
      taskSearchRef.current.style.display = "block";
      taskSearchRef.current.offsetHeight;
    }
    setTaskSearchShowing(!taskSearchShowing);
  }

  function handleTransitionStart() {
    if (taskSearchRef.current) taskSearchRef.current.style.display = "block";
    console.log("yipeee");
  }

  function handleTransitionEnd() {
    if (taskSearchRef.current)
      taskSearchRef.current.style.display =
        taskSearchRef.current.style.height === "0px" ? "none" : "block";
  }

  // useEffect(() => {
  //   if (taskSearchRef.current)
  //     taskSearchRef.current.addEventListener(
  //       "transitionstart",
  //       handleTransitionStart
  //     );
  // }, []);

  useEffect(() => {
    if (taskSearchRef.current)
      setContentHeight(taskSearchRef.current.scrollHeight);
  }, [children]);

  return (
    <>
      <SearchButton onButtonClick={handleTaskButtonClick} />
      {/* <div className={taskSearchShowing ? `block` : `hidden`}>{children}</div> */}
      <div
        ref={taskSearchRef}
        className={`overflow-hidden transition-all duration-200 ease-out`}
        style={{
          height: taskSearchShowing ? `${contentHeight}px` : `0px`,
        }}
        // onTransitionStart={handleTransitionStart}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </>
  );
}
