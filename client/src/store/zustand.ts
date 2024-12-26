import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

//define types of store
type DraftStore={
    title: string,
    description:string,
}
type UserStore={
    name: string,
    id:string,
}


/*
export  const useUserStore = create((set) => ({
    name:"",
    id:""
    setUser: (userData) => set({ user: userData }), // Action to set user
    clearUser: () => set({ user: null }), // Optional: clear user
}));*/




export const useDraftStore = create<DraftStore>((set) => ({
    title: "",
    description:"",

}))
//dont need persist just normal
export const useUserStore = create<UserStore>(
    persist(
        (set, get) => ({
            name: "",
            id:"",
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
        },
    ),
)




