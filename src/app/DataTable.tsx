"use client";

import { useState } from "react";
import StampRangeSearchOption from "./StampRangeSearchOption";
import TextSearchOption from "./TextSearchOption";

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

function getNumStamp(stamp: string) {
  return new Date(stamp).getTime();
}

function formatStampStr(stamp: string) {
  return new Date(stamp).toLocaleString();
}

export default function DataTable({ data }: DataFetcherProps) {
  console.log(data);

  const [stampRangeSearch, setStampRangeSearch] = useState<{
    from: number | null;
    to: number | null;
  }>({
    from: null,
    to: null,
  });
  const [goalSearch, setGoalSearch] = useState<string | null>(null);
  const [taskSearch, setTaskSearch] = useState<string | null>(null);

  function handleStampSearchInput(from: number | null, to: number | null) {
    setStampRangeSearch({ from, to });
  }

  function handleGoalSearchInput(term: string | null) {
    setGoalSearch(term);
  }

  function handleTaskSearchInput(term: string | null) {
    setTaskSearch(term);
  }

  const headerRow = (
    <tr>
      <th className="px-4 py-1 align-top min-w-36">
        Stamp
        <StampRangeSearchOption onSearchInput={handleStampSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">
        Goal
        <TextSearchOption onSearchInput={handleGoalSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">
        Task
        <TextSearchOption onSearchInput={handleTaskSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">Progress (Minutes)</th>
    </tr>
  );

  const filteredData = data?.filter(
    (item) =>
      (!stampRangeSearch.from ||
        stampRangeSearch.from <= getNumStamp(item.createdAt)) &&
      (!stampRangeSearch.to ||
        stampRangeSearch.to >= getNumStamp(item.createdAt)) &&
      (!goalSearch ||
        item.goal.toLowerCase().includes(goalSearch.toLowerCase())) &&
      (!taskSearch ||
        item.work.toLowerCase().includes(taskSearch.toLowerCase()))
  );

  const dataRows = filteredData?.map((item) => (
    <tr key={item.createdAt} className="odd:bg-gray-400/20">
      <td className="px-4 py-1">{formatStampStr(item.createdAt)}</td>
      <td
        className={`px-4 py-1 ${
          item.goal === "No Goal" ? `text-gray-500` : ``
        }`}
      >
        {item.goal}
      </td>
      <td className="px-4 py-1">{item.work}</td>
      <td className="px-4 py-1 relative">
        <span className="relative z-10">{item.elapsed}</span>
        {/* prettier-ignore */}
        <div className={`absolute ${!item.ended ? `bg-yellow-700` : (item.elapsed === item.time ? ` bg-green-900` : `bg-orange-900`)} w-[${Math.round((item.elapsed / item.time) * 93)}%] h-[max(50%,1.5rem)] top-1/2 -translate-y-1/2 left-2 rounded`}></div>
      </td>
    </tr>
  ));

  return (
    <table className="mx-auto">
      <thead>{headerRow}</thead>
      <tbody>{dataRows}</tbody>
    </table>
  );
}
