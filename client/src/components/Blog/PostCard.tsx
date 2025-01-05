"use client"
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter,usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {Post} from "@/@types/post";
import {Dispatch, SetStateAction} from "react";
import {DeletePost} from "@/components/Blog/DeletePost";
import fetchPost from "@/actions/client/fetch-post";





export default function PostCard({post, setEditMode,setPostData}:{post:Post,setEditMode:Dispatch<SetStateAction<boolean>>,setPostData:Dispatch<SetStateAction<Post[]>>}) {
    const router=useRouter();
    const pathname = usePathname()
    const t = useTranslations('PostPage');
    async function editPost(){
        setEditMode(true);
        fetchPost(post.slug).then((res)=>{
                setPostData(res);
            })
    }
    return (
            <Card key={post.slug} className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 text-sm flex-col items-start">
                    <div className="flex flex-row gap-2">
                    {post.published ?(<Button onClick={()=>{
                        router.push(`/posts/${post.slug}`);
                    }}>{t('read')}</Button>):(<><Button onClick={editPost}>{t('edit')}</Button></>)}
                        {pathname==="/profile"?(<DeletePost slug={post.slug} userId={post.userId}/>):null}
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p className="mt-2">{post.user.name}</p>
                        <p className="mt-2">{post.createdAt.split("T")[0]}</p>
                        {!post.published && <p className="mt-2">draft</p>}
                    </div>
                </CardFooter>
            </Card>



    );
}