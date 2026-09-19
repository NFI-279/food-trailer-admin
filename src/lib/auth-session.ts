let accessToken: string | null = null;

const AUTH_CHANGED_EVENT = "trailer-auth-changed";

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  if (!token.trim()) {
    throw new Error("The login response did not include an access token.");
  }

  accessToken = token;
  notifyAuthChanged();
}

export function clearAccessToken(): void {
  accessToken = null;
  notifyAuthChanged();
}

export function onAuthChanged(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener(AUTH_CHANGED_EVENT, listener);
  return () => window.removeEventListener(AUTH_CHANGED_EVENT, listener);
}

function notifyAuthChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
}
