import SessionsChart from "./SessionsChart";

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
      <h1 className="text-xl font-semibold text-center my-3">
        Arcade Lookup Graph
      </h1>
      <SessionsChart data={data.ok ? data.data : null} />
    </main>
  );
}
