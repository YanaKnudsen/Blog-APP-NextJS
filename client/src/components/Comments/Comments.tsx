"use client"
import fetchComments from "@/server/actions/fetch-comments";
import {Comment} from "@/@types/comment";
import CommentCard from "@/components/Comments/CommentCard";
import {QueryClient,HydrationBoundary,dehydrate,useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

import PaginationComponent from "@/components/Pagination/PaginationComponent";
import {Post} from "@/@types/post";


export default function Comments({post,page}:{post:Post}) {
    /* const commentsData:{comments:Comment[],count:number}= await fetchComments(1,post.id,post.slug);
    console.log(commentsData);*/
    //react query
   // const{data,error,fetchStatus}=useGetComments(page,post.id,post.slug);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const [id,setId]=useState<string>(post.id);
    const [take,setTake]=useState<number>(10);
    const [slug,setSlug]=useState<string>(post.slug);
    const [hasNext,setHasNext]=useState<boolean>(false);


    const { data } = useQuery({
        queryKey:["comments",currentPage,id,slug],
        queryFn:async ()=>fetchComments(currentPage,id,slug),
        keepPreviousData: true,
    })




    return (
        <div className="w-full">

            {data?.comments.map((comment:Comment) => (
                <div key={comment.id}><CommentCard comment={comment}/></div>
            ))}
            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} take={take} count={data?.count} />

        </div>

    );

}