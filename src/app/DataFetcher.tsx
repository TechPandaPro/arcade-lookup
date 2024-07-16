"use client";

export default function DataFetcher() {
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

    return res.json();
  }

  return (
    <div>
      <input type="text"></input>
      <button onClick={getData}>Fetch</button>
    </div>
  );
}
