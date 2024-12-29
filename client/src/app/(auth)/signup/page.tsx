"use client"
import {SignupForm} from "@/components/Signup/Forms/SignupForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const router=useRouter()
    const {status}=useSession();

    if(status==="authenticated"){
        router.push("/")
    }

    return (
        <div className="flex flex-grow justify-center items-center">
            <SignupForm/>
        </div>
    );
}