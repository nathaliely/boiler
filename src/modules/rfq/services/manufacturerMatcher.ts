export async function matchManufacturers(rfq: any, manufacturers: any[]) {
  const res = await fetch("/api/ai/match", {
    method: "POST",
    body: JSON.stringify({ rfq, manufacturers }),
  });
  return res.body; // stream
}