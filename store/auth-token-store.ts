import { create } from "zustand";

interface AuthTokenStore {
	token: string;
	setToken: (token: string) => void;
}

export const useAuthTokenStore = create<AuthTokenStore>()((set) => ({
	token: "",
	setToken: (token) =>
		set(() => ({
			token,
		})),
}));
