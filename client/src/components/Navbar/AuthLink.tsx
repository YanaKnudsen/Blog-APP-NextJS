"use client"

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";

export default function AuthLink() {
    const {status}=useSession();
    return (
        <div>
            {status === "unauthenticated" && <Button><Link href="/login">Log in</Link></Button>}
            {status === "authenticated" &&
                <div className="flex flex-col md:flex-row gap-5 items-center">
                    <Link href="/profile">Profile</Link>
                    <Link href="/add">New post</Link>
                    <Button onClick={()=>signOut()}>Log out</Button>
                </div>}

        </div>


    )
}