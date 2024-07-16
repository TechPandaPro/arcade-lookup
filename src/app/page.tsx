"use client";

import { useState } from "react";
import DataFetcher, { Data, DataFetchedHandler } from "./DataFetcher";

export default function Home() {
  const [history, setHistory] = useState<null | Data>(null);

  const handleDataFetched: DataFetchedHandler = (data: Data) => {
    setHistory(data);
  };

  return (
    <main>
      <h1>Hello, World!</h1>
      <DataFetcher onDataFetched={handleDataFetched} />
    </main>
  );
}
