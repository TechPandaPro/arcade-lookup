interface DataItem {
  createdAt: string;
  time: number;
  elapsed: number;
  goal: string;
  ended: boolean;
  work: string;
}

interface DataExtraStatsProps {
  data: DataItem[] | null;
}

function formatHours(hourCount: number) {
  return (Math.trunc(hourCount * 10) / 10).toLocaleString();
}

export default function DataExtraStats({ data }: DataExtraStatsProps) {
  let totalHours = "N/A";
  let hoursPerDay = "N/A";
  if (data) {
    const totalHoursNum = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.elapsed / 60,
      0
    );
    totalHours = formatHours(totalHoursNum);

    const oneDayMs = 1000 * 60 * 60 * 24;
    const startDate = new Date(
      new Date(data[0].createdAt).toDateString()
    ).getTime();
    const endDate = new Date(new Date().toDateString()).getTime();
    const dateCount = Math.round((endDate - startDate) / oneDayMs) + 1;

    const hoursPerDayNum = totalHoursNum / dateCount;
    hoursPerDay = formatHours(hoursPerDayNum);
  }

  return (
    <div className="flex justify-center">
      <div className="p-1 border-2 rounded-md border-gray-400">
        <table>
          <caption className="text-gray-500 dark:text-gray-300">
            Additional Stats
          </caption>
          <thead>
            <tr>
              <th className="px-2">Total Hours</th>
              <th className="px-2">Hours Per Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2">{totalHours}</td>
              <td className="px-2">{hoursPerDay}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
