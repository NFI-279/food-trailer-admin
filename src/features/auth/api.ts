import { apiFetch, API_BASE_URL } from "@/lib/api-client";

const AUTH_URL = `${API_BASE_URL}/auth`;

export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string }> => {
    try {
      return await apiFetch<{ access_token: string }>(`${AUTH_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Session expired. Please log in again.") {
        throw new Error("Invalid username or password.");
      }
      throw error;
    }
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    return apiFetch("/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};