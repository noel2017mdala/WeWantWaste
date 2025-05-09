import type { Skip } from "../types/skip";

const API_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

export async function fetchSkips(): Promise<Skip[]> {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch skips:", error);
    return [];
  }
}
