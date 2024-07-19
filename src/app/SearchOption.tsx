"use client";

import { ReactNode, TransitionEvent, useEffect, useRef, useState } from "react";
import SearchButton from "./SearchButton";

interface SearchOptionProps {
  onSuppressSearch: (doSuppress: boolean) => void;
  onAppear?: () => void;
  children: ReactNode;
}

export default function SearchOption({
  onSuppressSearch,
  onAppear,
  children,
}: SearchOptionProps) {
  const [taskSearchShowing, setTaskSearchShowing] = useState(false);
  const taskSearchRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  function handleTaskButtonClick() {
    if (
      taskSearchRef.current &&
      taskSearchRef.current.style.display !== "block"
    ) {
      taskSearchRef.current.style.display = "block";
      taskSearchRef.current.offsetHeight;
      if (onAppear) onAppear();
    }
    setTaskSearchShowing(!taskSearchShowing);
  }

  function handleTransitionEnd(e: TransitionEvent<HTMLInputElement>) {
    if (e.currentTarget === e.target && taskSearchRef.current) {
      const isFlattened = taskSearchRef.current.style.height === "0px";
      taskSearchRef.current.style.display = isFlattened ? "none" : "block";
      onSuppressSearch(isFlattened);
    }
  }

  useEffect(() => {
    if (taskSearchRef.current) {
      const initialDisplay = taskSearchRef.current.style.display;
      taskSearchRef.current.style.display = "block";
      setContentHeight(taskSearchRef.current.scrollHeight);
      taskSearchRef.current.style.display = initialDisplay;
    }
  }, [children]);

  return (
    <>
      <SearchButton onButtonClick={handleTaskButtonClick} />
      <div
        ref={taskSearchRef}
        className={`overflow-hidden transition-all duration-200 ease-out`}
        style={{
          height: taskSearchShowing ? `${contentHeight}px` : `0px`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </>
  );
}
