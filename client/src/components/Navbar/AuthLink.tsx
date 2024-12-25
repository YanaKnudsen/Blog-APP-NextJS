"use client"

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {useUserStore} from "@/store/zustand";

export default function AuthLink() {
    const {status}=useSession();
    const name = useUserStore((state) => state.name);
    const id = useUserStore((state) => state.id);
    return (
        <div>
            {status === "unauthenticated" && <Button><Link href="/login">Log in</Link></Button>}
            {status === "authenticated" &&
                <div className="flex flex-col md:flex-row gap-5 items-center">
                    <Link href="/profile">Profile</Link>
                    <Link href="/add">New post</Link>
                    <Button onClick={()=> {
                        signOut();
                        useUserStore.setState({id:""})
                        useUserStore.setState({name:""})

                    }}>Log out</Button>
                </div>}

        </div>


    )
}