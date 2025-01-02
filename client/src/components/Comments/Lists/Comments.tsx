"use client"
import fetchComments from "@/actions/client/fetch-comments";
import {Comment} from "@/@types/comment";
import CommentCard from "@/components/Comments/CommentCard";
import {useQuery} from "@tanstack/react-query";
import { useState} from "react";

import PaginationComponent from "@/components/Pagination/PaginationComponent";


export default function Comments({postId,slug}:{postId:string,slug:string}) {
    /* const commentsData:{comments:Comment[],count:number}= await fetchComments(1,post.id,post.slug);*/
    //react query
   // const{data,error,fetchStatus}=useGetComments(page,post.id,post.slug);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const [take]=useState<number>(10);


    const { data } = useQuery({
        queryKey:["comments",currentPage,postId,slug],
        queryFn:async ()=>fetchComments(currentPage,postId,slug),
       // keepPreviousData: true,
    })



    return (
        <div className="w-full">
            {data?.comments.map((comment:Comment) => (
                <div key={comment.id}><CommentCard comment={comment}/></div>
            ))}
            { data?.comments.length>0 && <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} take={take} count={data?.count} />}

        </div>

    );

}