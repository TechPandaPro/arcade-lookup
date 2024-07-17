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
      <th className="px-4 py-1">Stamp</th>
      <th className="px-4 py-1">Goal</th>
      <th className="px-4 py-1">Task</th>
      <th className="px-4 py-1">Progress (Minutes)</th>
    </tr>
  );

  const dataRows = data?.map((item) => (
    <tr key={item.createdAt} className="odd:bg-gray-400/20">
      <td className="px-4 py-1">{formatStampStr(item.createdAt)}</td>
      <td className="px-4 py-1">{item.goal}</td>
      <td className="px-4 py-1">{item.work}</td>
      {/* this styling didn't work well (a circle with the number inside) */}
      {/* <td className="px-4 py-1 relative">
        <div className="text-center absolute w-6 h-6 bg-transparent border-8 rounded-full border-gray-50/40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {item.elapsed}
          </div>
        </div>
      </td> */}
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
