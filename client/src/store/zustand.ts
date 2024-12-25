import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

//define types of store
type UserStore={

}



export  const useUserStore = create((set) => ({
    name:"",
    id:"",
    setUser: (userData) => set({ user: userData }), // Action to set user
    clearUser: () => set({ user: null }), // Optional: clear user
}));




export const useDraftStore = create((set) => ({
    title: "",
    description:"",
}))






