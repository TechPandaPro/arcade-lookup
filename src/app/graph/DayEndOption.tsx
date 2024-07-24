"use client";

import { useRef } from "react";

interface DayEndOptionProps {
  onDayEndInput: (ms: number) => void;
}

export default function DayEndOption({ onDayEndInput }: DayEndOptionProps) {
  const dayEndStampRef = useRef<HTMLInputElement | null>(null);

  function handleDayEndInput() {
    if (dayEndStampRef.current) {
      const [hours, minutes] = dayEndStampRef.current.value
        .split(":")
        .map(Number);

      const ms = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

      onDayEndInput(ms);
    }
  }

  return (
    <div className="flex justify-center gap-2 font-bold">
      <label htmlFor="dayEndStamp" className="flex items-center">
        Day End Time:
      </label>
      <input
        ref={dayEndStampRef}
        type="time"
        id="dayEndStamp"
        className="bg-transparent border-2 border-gray-300 focus:border-gray-500 dark:border-gray-500 dark:focus:border-gray-100 outline-none rounded-md px-2 py-1 w-28 text-xs font-normal transition-all duration-100"
        defaultValue="00:00"
        onInput={handleDayEndInput}
      />
    </div>
  );
}
