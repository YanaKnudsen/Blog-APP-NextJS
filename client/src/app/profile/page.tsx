import UserInfo from "@/components/Profile/UserInfo";
import Posts from "@/components/Blog/Posts";
import { getServerSession } from "next-auth"
import {authOptions} from "@/utils/auth";
import {QueryClient,HydrationBoundary,dehydrate} from "@tanstack/react-query";


export default async function ProfilePage(props: { searchParams: Promise<{ page: string}> }) {
    const {  searchParams } = props;
    const resolvedSearchParams = await searchParams;
    const page = await parseInt(resolvedSearchParams.page??1) || 1;
    const session = await getServerSession(authOptions);
    const queryClient = new QueryClient()
    const dehydratedState = dehydrate(queryClient);
    console.log("session",session)

    return (
        <HydrationBoundary state={ dehydratedState}>
        <div className="flex flex-col h-auto w-full items-center p-5">
            <UserInfo/>
            {session && <Posts page={page} label={"My posts"} id={session?.user.id}/>}


        </div>
        </HydrationBoundary>
    );
}