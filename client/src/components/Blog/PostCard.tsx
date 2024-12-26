"use client"
import {Post} from "@/@types/post";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useDraftStore, useUserStore} from '../../store/zustand';


export default function PostCard({post}) {
    const router=useRouter();
    const [edit,setEdit]=useState<boolean>(false);
    const title = useDraftStore((state) => state.title);
    const description = useDraftStore((state) => state.description);

    useEffect(() => {
        if(edit){
            useDraftStore.setState({title:post.title})
            useDraftStore.setState({description:post.description})
            useDraftStore.setState({id:post.id})
            router.push(`/add`);
        }
    }, [edit]);

    return (
            <Card key={post.slug} className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 text-sm flex-col items-start">
                    <div className="flex flex-row gap-2">
                    {post.published ?(<Button onClick={()=>{
                        router.push(`/posts/${post.slug}`);
                    }}>read</Button>):(<Button onClick={() => {
                        setEdit(true);
                    }}>edit</Button>)}
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