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
  // return (
  //   <table>
  //     <tr>
  //       <th>Total Hours:</th>
  //       <td></td>
  //     </tr>
  //     <tr>
  //       <th>Average h/day:</th>
  //       <td></td>
  //     </tr>
  //   </table>
  // );

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

  // return (
  //   <>
  //     <div>Total Hours: {totalHours}</div>
  //     <div>Hours Per Day: {hoursPerDay}</div>
  //   </>
  // );

  return (
    // <table className=" max-w-36">
    <div className="flex justify-center">
      <table>
        <caption>Additional Stats</caption>
        <thead>
          <tr>
            <th>Total Hours</th>
            <th>Hours Per Day</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalHours}</td>
            <td>{hoursPerDay}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
