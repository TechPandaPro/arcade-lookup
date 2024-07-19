"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

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

function stampToDateStr(stamp: number) {
  const date = new Date(stamp);
  const dateStr = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  return dateStr;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function SessionsChart({ data }: DataFetcherProps) {
  if (!data) return <div>No data</div>;

  data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const startDate = new Date(data[0].createdAt).getTime();

  const chartDates = [];

  const oneDayMs = 1000 * 60 * 60 * 24;

  for (let i = 0; i < 30; i++) {
    const dateToAdd = stampToDateStr(startDate + oneDayMs * i);
    const filtered = data.filter(
      (item) => stampToDateStr(new Date(item.createdAt).getTime()) === dateToAdd
    );
    const minutesSum = filtered.reduce(
      (accumulator, currentValue) => accumulator + currentValue.elapsed,
      0
    );
    chartDates.push({ date: dateToAdd, hours: minutesSum / 60 });
  }

  console.log(JSON.stringify(chartDates));

  // data.map((item) => {
  //   const createdAt = new Date(item.createdAt);
  //   const createdAtStr = `${(createdAt.getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0")}/${createdAt.getDate().toString().padStart(2, "0")}`;
  //   console.log(createdAtStr);
  // });

  // return (
  //   <Line
  //     data={{
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //       ],
  //       datasets: [
  //         {
  //           label: "My First Dataset",
  //           data: [65, 59, 80, 81, 56, 55, 40],
  //           fill: false,
  //           borderColor: "rgb(75, 192, 192)",
  //           tension: 0.1,
  //         },
  //       ],
  //     }}
  //   />
  // );

  return (
    <Line
      data={{
        labels: chartDates.map((chartDate) => chartDate.date),
        datasets: [
          {
            label: "Hour Count",
            data: chartDates.map((chartDate) => chartDate.hours),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.01,
          },
        ],
      }}
      // options={{ scales: { xAxes: { ticks: { font: { size: 100 } } } } }}
      // options={{ plugins: { legend: { labels: { font: { size: 100 } } } } }}
    />
  );
}
