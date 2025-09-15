export async function translate(text: string, target: "en" | "vi" = "en") {
  const res = await fetch("/api/ai/translate", {
    method: "POST",
    body: JSON.stringify({ text, target }),
  });
  return res.body; // stream
}