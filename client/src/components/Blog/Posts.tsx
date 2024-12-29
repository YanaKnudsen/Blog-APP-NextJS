"use client"
import fetchPosts from "@/actions/client/fetch-posts";
import PostCard from "@/components/Blog/PostCard";
import {useQuery}  from "@tanstack/react-query";
import {useState} from "react";
import PaginationComponent from "@/components/Pagination/PaginationComponent";



export default function Posts({ page,label,id}:{ page:number,label:string,id:string}) {
    //fetch all posts on server component
    /*const postsData:{posts:Post[],count:number}= await fetchPosts(currentPage,take,id);
    console.log("postsData",postsData);*/
    const [currentPage,setCurrentPage]=useState<number>(page);
    const [take]=useState<number>(4);

    const { data } = useQuery({
        queryKey:["posts",currentPage,take,id],
        queryFn:async ()=>fetchPosts(currentPage,take,id),
    })

    return (
        <div className="flex flex-col h-auto w-full items-center ">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
                {label}
            </h2>
            {data?.posts.map((post)=>(
                <div key={post.id} className="w-full flex mb-2 items-center justify-center">
                <PostCard post={post}/>
                </div>
            ))}
            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} take={take} count={data?.count} />


        </div>
    );
}