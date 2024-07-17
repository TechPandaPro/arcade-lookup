import { useState } from "react";
import SearchButton from "./SearchButton";
import SearchOptions from "./SearchOptions";

interface DataItem {
  createdAt: string;
  time: number;
  elapsed: number;
  goal: string;
  ended: boolean;
  work: string;
}

interface DataFetcherProps {
  data: null | DataItem[];
}

function formatStampStr(stamp: string) {
  return new Date(stamp).toLocaleString();
}

export default function DataTable({ data }: DataFetcherProps) {
  console.log(data);

  const headerRow = (
    <tr>
      <th className="px-4 py-1 align-top">
        Stamp
        <SearchOptions />
      </th>
      <th className="px-4 py-1 align-top">
        Goal
        <SearchOptions />
      </th>
      <th className="px-4 py-1 align-top">
        Task
        <SearchOptions />
      </th>
      <th className="px-4 py-1 align-top">Progress (Minutes)</th>
    </tr>
  );

  const dataRows = data?.map((item) => (
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
