import DataTable from "./DataTable";
import Header from "./Header";
import { Metadata } from "next";

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
  const res = await fetch(`https://hackhour.hackclub.com/api/history/me`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    // next: { revalidate: 10 },
    cache: "no-store",
  });
  return (await res.json()) as Promise<ResponseData>;
}

export const metadata: Metadata = {
  title: "Arcade Lookup | Sessions",
  description: "Displays all your session data for Hack Club Arcade",
  icons: {
    icon: [
      {
        url: "favicon_light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "favicon_dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex flex-col items-center min-h-full px-5 pt-5 pb-8">
      <Header currentPath="/" />
      <DataTable data={data.ok ? data.data : null} />
    </main>
  );
}
