"use client"
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Post} from "@/@types/post";
import {Dispatch, SetStateAction} from "react";




export default function PostCard({post, setEditMode,setCurrentPostSlug}:{post:Post,setEditMode:Dispatch<SetStateAction<boolean>>,setCurrentPostSlug:Dispatch<SetStateAction<string|undefined>>}) {
    const router=useRouter();
    const t = useTranslations('PostPage');
    return (
            <Card key={post.slug} className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 text-sm flex-col items-start">
                    <div className="flex flex-row gap-2">
                    {post.published ?(<Button onClick={()=>{
                        router.push(`/posts/${post.slug}`);
                    }}>{t('read')}</Button>):(<><Button onClick={() => {
                        setEditMode(true);
                        setCurrentPostSlug(post.slug);
                    }}>{t('edit')}</Button></>)}
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