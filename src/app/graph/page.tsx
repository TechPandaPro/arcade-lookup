import Header from "../Header";
import StatsViewer from "./StatsViewer";

interface ResponseData {
  ok: boolean;
  data: {
    createdAt: string;
    time: number;
    elapsed: number;
    goal: string;
    ended: boolean;
    work: string;
  }[];
}

async function getData() {
  // FIXME: fix old data caching
  const res = await fetch(`https://hackhour.hackclub.com/api/history/me`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    next: { revalidate: 10 },
  });
  return (await res.json()) as Promise<ResponseData>;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex flex-col items-center h-full px-5 pt-5 pb-8">
      <Header currentPath="/graph" />
      {/* <h2 className="text-2xl font-semibold text-center mb-1">Stats</h2> */}
      {/* <div className="w-48 h-0.5 bg-white mb-3 rounded-full"></div> */}
      <StatsViewer data={data.ok ? data.data : null} />
    </main>
  );
}
