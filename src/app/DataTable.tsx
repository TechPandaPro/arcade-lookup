"use client";

import { useEffect, useRef, useState } from "react";
import StampRangeSearchOption from "./StampRangeSearchOption";
import TextSearchOption from "./TextSearchOption";
import SortOption from "./SortOption";

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
  const [sortBy, setSortBy] = useState<{ sortId: string; sortBy: 0 | -1 | 1 }>({
    sortId: "createdAt",
    sortBy: 1,
  });

  const tableRef = useRef<HTMLTableElement | null>(null);

  function handleStampSearchInput(from: number | null, to: number | null) {
    setStampRangeSearch({ from, to });
  }

  function handleGoalSearchInput(term: string | null) {
    setGoalSearch(term);
  }

  function handleTaskSearchInput(term: string | null) {
    setTaskSearch(term);
  }

  function handleSortClick(sortId: string) {
    if (sortId === sortBy.sortId)
      setSortBy({ sortId, sortBy: sortBy.sortBy === -1 ? 1 : -1 });
    else setSortBy({ sortId, sortBy: 1 });
  }

  useEffect(() => {
    if (tableRef.current) {
      const allTh = tableRef.current.querySelectorAll("thead th");
      for (let i = 0; i < allTh.length; i++) {
        const th = allTh[i] as HTMLTableCellElement;
        th.style.width = `${th.offsetWidth}px`;
      }
    }
  }, []);

  const headerRow = (
    <tr>
      <th></th>
      <th className="px-4 py-1 align-top min-w-36">
        <SortOption
          sortId="createdAt"
          text="Stamp"
          sortBy={sortBy.sortId === "createdAt" ? sortBy.sortBy : 0}
          onSortClick={handleSortClick}
        />
        <StampRangeSearchOption onSearchInput={handleStampSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">
        <SortOption
          sortId="goal"
          text="Goal"
          sortBy={sortBy.sortId === "goal" ? sortBy.sortBy : 0}
          onSortClick={handleSortClick}
        />
        <TextSearchOption onSearchInput={handleGoalSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">
        <SortOption
          sortId="work"
          text="Task"
          sortBy={sortBy.sortId === "work" ? sortBy.sortBy : 0}
          onSortClick={handleSortClick}
        />
        <TextSearchOption onSearchInput={handleTaskSearchInput} />
      </th>
      <th className="px-4 py-1 align-top min-w-36">
        <SortOption
          sortId="elapsed"
          text="Minutes"
          sortBy={sortBy.sortId === "elapsed" ? sortBy.sortBy : 0}
          onSortClick={handleSortClick}
        />
      </th>
    </tr>
  );

  const filteredData = data?.filter(
    (item) =>
      (!stampRangeSearch.from ||
        stampRangeSearch.from <= getNumStamp(item.createdAt)) &&
      (!stampRangeSearch.to ||
        stampRangeSearch.to >= getNumStamp(item.createdAt)) &&
      (!goalSearch ||
        item.goal
          .toLowerCase()
          .trim()
          .includes(goalSearch.toLowerCase().trim())) &&
      (!taskSearch ||
        item.work
          .toLowerCase()
          .trim()
          .includes(taskSearch.toLowerCase().trim()))
  );

  // 0 = no sorting, -1 = descending, 1 = ascending
  filteredData?.sort((a, b) => {
    if (sortBy.sortId === "createdAt") {
      const aStamp = getNumStamp(a.createdAt);
      const bStamp = getNumStamp(b.createdAt);
      return sortBy.sortBy === 1 ? aStamp - bStamp : bStamp - aStamp;
    } else if (sortBy.sortId === "goal")
      return sortBy.sortBy === 1
        ? a.goal.localeCompare(b.goal)
        : b.goal.localeCompare(a.goal);
    else if (sortBy.sortId === "work")
      return sortBy.sortBy === 1
        ? a.work.localeCompare(b.work)
        : b.work.localeCompare(a.work);
    else if (sortBy.sortId === "elapsed")
      return sortBy.sortBy === 1
        ? a.elapsed - b.elapsed
        : b.elapsed - a.elapsed;
    else return 0;
  });

  const dataRows = filteredData?.map((item, i) => (
    <tr key={item.createdAt} className="odd:bg-gray-400/20">
      <td className="pl-3 text-xs text-gray-400 text-right">{i + 1}</td>
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

  if (dataRows && dataRows.length >= 1) {
    const sum =
      filteredData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.elapsed,
        0
      ) ?? 0;
    dataRows.push(
      <tr key="summary" className="bg-gray-400/30">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className="px-3 py-1 text-sm">
          {sum} ({Math.trunc((sum / 60) * 100) / 100} hr)
        </td>
      </tr>
    );
  }

  // FIXME: add message when no sessions are shown for the given filters
  return (
    <>
      <table ref={tableRef} className="mx-auto">
        <thead>{headerRow}</thead>
        <tbody>{dataRows}</tbody>
      </table>
      {!dataRows || dataRows.length === 0 ? (
        <div className="text-center">No Results</div>
      ) : (
        ""
      )}
    </>
  );
}
