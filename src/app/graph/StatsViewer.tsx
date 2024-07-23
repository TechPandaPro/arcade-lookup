"use client";

import { useState } from "react";
import DayEndOption from "./DayEndOption";
import SessionsChart from "./SessionsChart";
import DataExtraStats from "./DataExtraStats";

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
    <div className="flex flex-col gap-4 w-[800px] max-w-full overflow-hidden">
      <DayEndOption onDayEndInput={handleDayEndInput} />
      <DataExtraStats data={data} />
      <SessionsChart data={data} dayEndMs={dayEndMs} />
    </div>
  );
}
