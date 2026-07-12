import { apiFetch, API_BASE_URL } from "@/lib/api-client";

const AUTH_URL = `${API_BASE_URL}/auth`;

export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string }> => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Invalid username or password");
    return response.json();
  },

  // Make sure this block exists!
  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    return apiFetch("/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};