import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

//define types of store
type CounterStore={
    count:number;
    increment:()=>void;
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    increment:()=>{
        set({count:1})
    }

}))
/*
export  const useUserStore = create((set) => ({
    name:"",
    setUser: (userData) => set({ user: userData }), // Action to set user
    clearUser: () => set({ user: null }), // Optional: clear user
}));*/


export const useBearStore = create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))

export const useDraftStore = create((set) => ({
    isDraft: true,
    setIsDraft: (draft) => set({ isDraft: draft}),

}))
//dont need persist just normal
export const useUserStore = create(
    persist(
        (set, get) => ({
            user: "",
            id:"",
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
        },
    ),
)

export const useMainBlogStore = create((set) => ({
    currentPage: 1,
    items_per_page:4,
}))


