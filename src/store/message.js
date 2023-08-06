import { create } from "zustand";

export const useMessageStore = create(
    (set) => ({
            currentChat: 0,
            setCurrentChat: (num) => set((state) => ({currentChat: num - 0})),
        }
    ))