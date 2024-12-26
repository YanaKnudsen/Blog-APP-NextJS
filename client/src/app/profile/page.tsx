import UserInfo from "@/components/Profile/UserInfo";
import Posts from "@/components/Blog/Posts";
import { getServerSession } from "next-auth"
import {authOptions} from "@/utils/auth";
import {QueryClient,HydrationBoundary,dehydrate,useQuery} from "@tanstack/react-query";


export default async function ProfilePage({searchParams}:{ searchParams: { page:string }}) {
    const page = parseInt(searchParams.page??1) || 1;
    const session = await getServerSession(authOptions);
    const queryClient = new QueryClient()
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={ dehydratedState}>
        <div className="flex flex-col h-auto w-full items-center p-5">
            <UserInfo/>
            {session && <Posts page={page} label={"My posts"} id={session?.user.id}/>}


        </div>
        </HydrationBoundary>
    );
}