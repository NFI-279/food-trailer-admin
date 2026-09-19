import { clearAccessToken, getAccessToken } from "@/lib/auth-session";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch {
    throw new Error("Unable to reach the API. Check the connection and try again.");
  }

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      clearAccessToken();
      if (window.location.pathname !== "/login") {
        window.location.assign("/login?reason=expired");
      }
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    let errorMessage = `API request failed (${response.status}).`;
    try {
      const errorData = await response.json();
      if (errorData?.message) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : String(errorData.message);
      }
    } catch {
      if (response.statusText) errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  const text = await response.text();
  if (!text) return null as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Received malformed data from the server.");
  }
}
