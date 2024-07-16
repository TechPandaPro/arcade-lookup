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
    </tr>
  );

  const dataRows = data?.map((item) => (
    <tr key={item.createdAt} className="odd:bg-gray-400/20">
      <td className="px-4 py-1">{formatStampStr(item.createdAt)}</td>
      <td className="px-4 py-1">{item.goal}</td>
      <td className="px-4 py-1">{item.work}</td>
    </tr>
  ));

  return (
    <table>
      <thead>{headerRow}</thead>
      <tbody>{dataRows}</tbody>
    </table>
  );
}
