"use client"
import {useSession} from "next-auth/react";
import {TypographyH2} from "@/components/ui/typography/typography";
import {useEffect} from "react";
import {useUserStore,useBearStore,useCounterStore} from '../../store/zustand';

export default function UserInfo() {
    const {data:session,status}=useSession()
    console.log("session",session)
    const name = useUserStore((state) => state.name);
    useEffect(() => {
        if (session) {
            useUserStore.setState({id:session.user.id})
            useUserStore.setState({name:session.user.name})
        }
    }, []);


    return (
        <div className="w-full flex flex-col items-center">
            <TypographyH2>Welcome back, {name}</TypographyH2>
        </div>
    );
}