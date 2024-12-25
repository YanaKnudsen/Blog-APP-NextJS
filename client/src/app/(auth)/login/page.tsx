"use client"
import {LoginForm} from "@/components/ui/custom/login-form";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginPage() {

    return (
        <div className="flex flex-grow justify-center items-center">
          <LoginForm/>
        </div>
    );
}
