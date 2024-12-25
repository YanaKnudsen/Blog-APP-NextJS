"use client"
import {SignupForm} from "@/components/ui/custom/signup-form";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function SignupPage() {
    const router=useRouter()
    const {status}=useSession();

    useEffect(() => {
        if(status==="authenticated"){
            router.push("/")
        }
    }, []);

    return (
        <div className="flex flex-grow justify-center items-center">
            <SignupForm/>
        </div>
    );
}