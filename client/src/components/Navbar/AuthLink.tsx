"use client"

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {signOut} from "next-auth/react";

export default function AuthLink() {
    const {data,status}=useSession();
    return (
        <div>
            {status === "unauthenticated" && <Button>Log in</Button>}
            {status === "authenticated" &&
                <div className="flex flex-row gap-5">
                    <Link href="/new">Write</Link>
                    <Button onClick={()=>{signIn("google");}}>Log out</Button>
                </div>}

        </div>


    )
}