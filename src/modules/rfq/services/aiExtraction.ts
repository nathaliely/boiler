export async function extractFromText(text: string) {
  const res = await fetch("/api/ai/extract", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return res.body; // stream
}