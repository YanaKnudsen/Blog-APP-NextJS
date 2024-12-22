"use client"

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function AuthLink() {
    const [isLogined,setIsLogined]=useState<boolean>(false)
    return (
        <div>
            {!isLogined && <Button>Log in</Button>}
            {isLogined &&
                <div>Write Log out etc
                    <Link href="/new">Write</Link>
                    <Link href="/new">Log out</Link>
                </div>}

        </div>


    )
}