// FIXME: send errors as json. including one for not adding an API key
// FIXME: remove route
export async function GET(request: Request) {
  const res = await fetch(`https://hackhour.hackclub.com/api/history/me`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const data = await res.json();
  return Response.json(data);
}
