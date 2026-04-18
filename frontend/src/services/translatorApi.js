const API_BASE_URL = "http://localhost:4001";

export async function translateText(text) {
  const response = await fetch(`${API_BASE_URL}/api/v1/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "No se pudo traducir el texto");
  }

  return data;
}