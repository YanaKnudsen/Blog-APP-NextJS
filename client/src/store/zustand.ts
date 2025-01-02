import {create} from 'zustand';
import { persist } from 'zustand/middleware'

//define types of store


type UserStore={
    name: string|null,
    id:string,
}


/*
export  const useUserStore = edit((set) => ({
    name:"",
    id:""
    setUser: (userData) => set({ user: userData }), // Action to set user
    clearUser: () => set({ user: null }), // Optional: clear user
}));*/



export const useUserStore = create<UserStore>()(
   persist(
        ():UserStore => ({
            name:"",
            id:"",
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
        },
    ),
)