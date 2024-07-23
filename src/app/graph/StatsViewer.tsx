"use client";

import { useState } from "react";
import DayEndOption from "./DayEndOption";
import SessionsChart from "./SessionsChart";

interface DataItem {
  createdAt: string;
  time: number;
  elapsed: number;
  goal: string;
  ended: boolean;
  work: string;
}

interface DataFetcherProps {
  data: DataItem[] | null;
}

export default function StatsViewer({ data }: DataFetcherProps) {
  const [dayEndMs, setDayEndMs] = useState<number>(0);

  function handleDayEndInput(ms: number) {
    setDayEndMs(ms);
  }

  return (
    <>
      <DayEndOption onDayEndInput={handleDayEndInput} />
      <SessionsChart data={data} dayEndMs={dayEndMs} />
    </>
  );
}
