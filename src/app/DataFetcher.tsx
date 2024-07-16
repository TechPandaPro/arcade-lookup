"use client";

export interface Data {
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

export type DataFetchedHandler = (data: Data) => void;

interface DataFetcherProps {
  onDataFetched: DataFetchedHandler;
}

export default function DataFetcher({ onDataFetched }: DataFetcherProps) {
  async function getData() {
    // FIXME: replace these
    const slackId = "foo";
    const apiKey = "bar";

    // FIXME: this needs to be fetched server-side (CORs)
    const res = await fetch(
      `https://hackhour.hackclub.com/api/history/${slackId}/`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return res.json() as Promise<Data>;
  }

  async function handleClick() {
    const data = await getData();
    onDataFetched(data);
  }

  return (
    <div>
      <input type="text"></input>
      <button onClick={handleClick}>Fetch</button>
    </div>
  );
}
