"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  zoomPlugin
);

// zoomPlugin.zoomRectFunctions.myScale = (scale, zoom, center, limits) => {
//   console.log("test");
// };

export default function SessionsChart({ data }: DataFetcherProps) {
  if (!data) return <div>No data</div>;

  data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const oneDayMs = 1000 * 60 * 60 * 24;

  const startDate = new Date(
    new Date(data[0].createdAt).toDateString()
  ).getTime();
  const endDate = new Date(new Date().toDateString()).getTime();
  const dateCount = Math.round((endDate - startDate) / oneDayMs) + 1;
  // const startDateObj = new Date(data[0].createdAt);
  // const startDate = startDateObj.getTime();
  // const endDateObj = new Date();
  // const dateCount =
  //   Math.round(
  //     (new Date(startDateObj.toDateString()).getTime() -
  //       new Date(endDateObj.toDateString()).getTime()) /
  //       oneDayMs
  //   ) + 1;

  const chartDates = [];

  for (let i = 0; i < dateCount; i++) {
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

  return (
    <div className="flex-grow w-[800px] max-w-full">
      <Line
        // style={{ maxWidth: "500px" }}
        // datasetIdKey="hours"
        data={{
          labels: chartDates.map((chartDate) => chartDate.date),
          datasets: [
            {
              label: "Hour Count",
              data: chartDates.map(
                (chartDate) => Math.trunc(chartDate.hours * 10) / 10
              ),
              fill: false,
              // borderColor: "rgb(252, 151, 119)",
              borderColor: "rgb(102 204 204)",
              // borderColor: "rgb(255, 255, 255)",
              tension: 0,
            },
          ],
        }}
        options={{
          responsive: true,
          aspectRatio: 3,
          // plugins: { title: { display: true, text: "hey" } },
          plugins: {
            // legend: { labels: { font: { size: 100 } } },
            tooltip: {
              backgroundColor: "rgb(64 64 64 / 0.8)",
              animation: {
                duration: 100,
              },
            },
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
                // scaleMode: "x",
                // threshold: 10,
                onPanStart: (chart) => {
                  if (!chart.chart.isZoomedOrPanned()) return false;
                },
              },
              zoom: {
                wheel: {
                  enabled: true,
                  // speed: 0.05,
                },
                pinch: { enabled: true },
                mode: "x",
                // scaleMode: "y",
                drag: {
                  enabled: true,
                  backgroundColor: "rgb(102 204 204 / 0.2)",
                  modifierKey: "alt",
                },
              },
              // limits: { x: { min: 0, max: 10 } },
            },
          },
          // transitions: {
          //   zoom: {
          //     animation: { duration: 200, easing: "easeOutCubic" },
          //   },
          // },
          scales: {
            x: {
              ticks: { font: { size: 15 }, minRotation: 0, maxRotation: 10 },
            },
          },
          interaction: { intersect: false, mode: "index" },
        }}
        plugins={[
          {
            id: "verticalLine",
            afterDraw: (chart) => {
              if (chart.tooltip?.opacity) {
                console.log("draw");
                const ctx = chart.ctx;

                const x = chart.tooltip.caretX;

                ctx.save();

                ctx.beginPath();
                ctx.globalAlpha = chart.tooltip.opacity;

                ctx.strokeStyle = "rgb(102 204 204)";
                ctx.lineWidth = 2;

                ctx.moveTo(x, chart.scales.y.top);
                ctx.lineTo(x, chart.scales.y.bottom);

                ctx.stroke();

                ctx.restore();
              }
            },
          },
        ]}
        // options={{ interaction: { mode: "nearest" } }}
        // options={{ scales: { xAxes: { ticks: { font: { size: 100 } } } } }}
        // options={{ plugins: { legend: { labels: { font: { size: 100 } } } } }}
      />
    </div>
  );
}
