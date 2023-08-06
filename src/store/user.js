import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(persist(
    (set) => ({
        isAuth: false,
        userData: {id: '', name: '', email: '', isVerify: ''},
        setAuthState: (bool) => set((state) => ({isAuth: bool})),
        setUserData: (id, name, email, isVerify) => set((state) => ({userData: {id: id, name: name, email: email, isVerify: isVerify}})),
        setVerificationState: (bool) => set((state) => ({userData: {id: state.userData.id, name: state.userData.name, email: state.userData.email, isVerify: bool}})),
        removeUserData: () => set((state) => ({userData: {id: '', name: '', email: '', isVerify: ''}}))
    }),
    {
        name: 'user-data',
        storage: createJSONStorage(() => localStorage)
    }
))