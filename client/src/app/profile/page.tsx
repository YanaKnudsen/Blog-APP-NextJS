import UserInfo from "@/components/Profile/UserInfo";
import Posts from "@/components/Blog/Posts";
import { getServerSession } from "next-auth"
import {authOptions} from "@/utils/auth";


export default async function ProfilePage({searchParams}) {
    const page = parseInt(searchParams.page) || 1;
    const session = await getServerSession(authOptions);


    return (
        <div className="flex flex-col h-auto w-full items-center p-5">
            <UserInfo/>
            {session && <Posts currentPage={page} label={"My posts"} id={session?.user.id}/>}


        </div>
    );
}