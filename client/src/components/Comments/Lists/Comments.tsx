"use client"
import fetchComments from "@/actions/client/fetch-comments";
import {Comment} from "@/@types/comment";
import CommentCard from "@/components/Comments/Lists/CommentCard";
import {useQuery} from "@tanstack/react-query";
import { useState} from "react";

import PaginationComponent from "@/components/Pagination/PaginationComponent";
import {Post} from "@/@types/post";
import {useSession} from "next-auth/react";


export default function Comments({post}:{post:Post}) {
    /* const commentsData:{comments:Comment[],count:number}= await fetchComments(1,post.id,post.slug);
    console.log(commentsData);*/
    //react query
   // const{data,error,fetchStatus}=useGetComments(page,post.id,post.slug);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const [id]=useState<string>(post.id);
    const [take]=useState<number>(10);
    const [slug]=useState<string>(post.slug);


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
            { data?.comments.length>0 && <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} take={take} count={data?.count} />}

        </div>

    );

}