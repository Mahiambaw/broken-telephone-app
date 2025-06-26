import type { Result } from "../interfaces/Result";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://broken-telephone-app.onrender.com"
    : "http://127.0.0.1:5000"; // for local dev

export const sendPrompt = async (
  prompt: string,
  round: number
): Promise<{ result: Result[]; error?: string }> => {
  console.log("Sending request with:", { prompt, round });

  const response = await fetch(`${BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, round }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  console.log("Backend response:", data);
  return data;
};
