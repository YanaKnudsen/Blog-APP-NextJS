import UserInfo from "@/components/Profile/UserInfo";
import Posts from "@/components/Blog/Posts";
import {getServerSession, Session} from "next-auth"
import {authOptions} from "@/utils/auth";
import {QueryClient,HydrationBoundary,dehydrate} from "@tanstack/react-query";
import {getTranslations} from 'next-intl/server';


export default async function ProfilePage(props: { searchParams: Promise<{ page: string}> }) {
    const {  searchParams } = props;
    const resolvedSearchParams = await searchParams;
    const page = await parseInt(resolvedSearchParams.page??1) || 1;
    const session:Session|null = await getServerSession(authOptions);
    const queryClient = new QueryClient()
    const dehydratedState = dehydrate(queryClient);
    const t = await getTranslations('Profile');

    return (
        <HydrationBoundary state={ dehydratedState}>
        <div className="flex flex-col h-auto w-full items-center p-5">
            <UserInfo/>
            {session && <Posts page={page} label={t('title')} userId={session?.user?.id}/>}


        </div>
        </HydrationBoundary>
    );
}