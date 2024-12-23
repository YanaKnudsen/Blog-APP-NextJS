import { create } from 'zustand'

type Store = {
    count: number
    inc: () => void
}

export const localStore = create<Store>()((set) => ({
    user:{
        FullName:"Yana Knudsen"
    },
    updateUser:(updatedUser)=>set((state)=>({
        user:{...state.user,...updatedUser}
    }))
}))

//new
export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

