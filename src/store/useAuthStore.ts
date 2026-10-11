import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  name: string;
  email?: string;
  phone?: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (identifier: { email?: string; phone?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (identifier) => set({ user: { name: "Madison Ruiz", ...identifier } }),
      logout: () => set({ user: null }),
    }),
    { name: "ibex-auth", skipHydration: true }
  )
);
