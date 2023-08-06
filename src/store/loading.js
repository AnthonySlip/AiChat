import { create } from "zustand";

export const useLoadingStore = create(
    (set) => ({
        isLoading: false,
        setLoadingState: (bool) => set((state) => ({isLoading: bool})),
    }
))