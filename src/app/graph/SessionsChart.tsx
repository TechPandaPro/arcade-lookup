"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { useEffect, useRef } from "react";

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
  dayEndMs: number;
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
  Title,
  Tooltip,
  zoomPlugin
);

export default function SessionsChart({ data, dayEndMs }: DataFetcherProps) {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && data) {
      const oneDayMs = 1000 * 60 * 60 * 24;

      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const startDate =
        new Date(new Date(data[0].createdAt).toDateString()).getTime() +
        dayEndMs;
      const endDate = new Date(new Date().toDateString()).getTime() + dayEndMs;
      const dateCount = Math.round((endDate - startDate) / oneDayMs) + 1;

      const chartDates = [];

      for (let i = 0; i < dateCount; i++) {
        const filtered = data.filter((item) => {
          const itemTime = new Date(item.createdAt).getTime();
          return (
            itemTime >= startDate + oneDayMs * i &&
            itemTime < startDate + oneDayMs * (i + 1)
          );
        });
        const minutesSum = filtered.reduce(
          (accumulator, currentValue) => accumulator + currentValue.elapsed,
          0
        );
        chartDates.push({
          date: stampToDateStr(startDate + oneDayMs * i),
          hours: minutesSum / 60,
        });
      }

      console.log(JSON.stringify(chartDates));

      chart.data = {
        labels: chartDates.map((chartDate) => chartDate.date),
        datasets: [
          {
            label: "Hour Count",
            data: chartDates.map(
              (chartDate) => Math.trunc(chartDate.hours * 10) / 10
            ),
            fill: false,
            borderColor: "rgb(102 204 204)",
            tension: 0,
          },
        ],
      };

      chart.update();
    }
  }, [data, dayEndMs]);

  if (!data) return <div>No data</div>;

  return (
    <div className="aspect-[3/1] min-h-44 w-auto max-w-full">
      <Chart
        ref={chartRef}
        type="line"
        className="border-2 rounded-md border-gray-400"
        data={{ labels: [], datasets: [] }}
        options={{
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              right: 30,
              bottom: 10,
              left: 35,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Hours/Day Chart",
              color: "rgb(209 213 219)",
              font: { size: 16, weight: "normal" },
            },
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
                onPanStart: (chart) => {
                  if (!chart.chart.isZoomedOrPanned()) return false;
                },
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: { enabled: true },
                mode: "x",
                drag: {
                  enabled: true,
                  backgroundColor: "rgb(102 204 204 / 0.2)",
                  modifierKey: "alt",
                },
              },
            },
          },
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
      />
    </div>
  );
}
