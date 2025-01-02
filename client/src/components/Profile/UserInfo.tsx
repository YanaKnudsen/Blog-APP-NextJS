"use client"
import {useSession} from "next-auth/react";
import {TypographyH2} from "@/components/ui/typography/typography";
import {useEffect} from "react";
import {useUserStore} from '../../store/zustand';
import {useTranslations} from 'next-intl';

export default function UserInfo() {
    const {data:session}=useSession()
    console.log("session",session)
    const name = useUserStore((state) => state.name);
    useEffect(() => {
        if (session) {
            useUserStore.setState({id:session.user?.id})
            useUserStore.setState({name:session.user?.name})
        }
    }, [session]);
    const t = useTranslations('Profile');

    return (
        <div className="w-full flex flex-col items-center mb-10 mt-10">
            {name && <TypographyH2>{t('welcome')} {name}</TypographyH2>}
        </div>
    );
}
