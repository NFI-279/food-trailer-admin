// [Frontend] src/lib/api-client.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Grab the token
  const token = typeof window !== "undefined" ? localStorage.getItem("trailer_token") : null;

  // Attach the token to the headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If the backend says the token is invalid/expired, log them out!
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("trailer_token");
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    let errorMessage = `API error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      // Ignore if it's not JSON
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses (like when we DELETE something)
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    //console.error("Failed to parse API response as JSON:", text);
    throw new Error("Received malformed data from the server.");
  }
}