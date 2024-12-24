"use client"

import {useSession} from "next-auth/react";

export default function ProfilePage() {
    const session=useSession();
    return (
        <div>
            user profile here
        </div>
    );
}