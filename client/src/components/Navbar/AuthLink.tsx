"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {useUserStore} from "@/store/zustand";
import {useTranslations} from "next-intl";

export default function AuthLink() {
    const {status}=useSession();
    const t = useTranslations('Navbar');
    return (
        <div>
            {status === "unauthenticated" && <Button><Link href="/login">{t('login')}</Link></Button>}
            {status === "authenticated" &&
                <div className="flex flex-col md:flex-row gap-5 items-center">
                    <Link href="/profile">{t('profile')}</Link>
                    <Link href="/edit">{t('newPost')}</Link>
                    <Button onClick={()=> {
                        signOut({callbackUrl: '/', redirect:true});
                        useUserStore.setState({id:""})
                        useUserStore.setState({name:""})
                    }}>{t('logout')}</Button>
                </div>}

        </div>


    )
}