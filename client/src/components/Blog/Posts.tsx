"use client"
import fetchPosts from "@/actions/client/fetch-posts";
import fetchPost from "@/actions/client/fetch-post";
import PostCard from "@/components/Blog/PostCard";
import {useQuery}  from "@tanstack/react-query";
import {useEffect, useState} from "react";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import PostForm from "@/components/Blog/Forms/PostForm";
import {Post} from "@/@types/post";



export default function Posts({ page,label,userId=""}:{ page:number,label:string,userId:string | undefined}) {
    //fetch all posts on server component
    /*const postsData:{posts:Post[],count:number}= await fetchPosts(currentPage,take,id);*/
    const [currentPage,setCurrentPage]=useState<number>(page);
    const [take]=useState<number>(4);
    const [editMode,setEditMode]=useState<boolean>(false);
    const [currentPostSlug,setCurrentPostSlug]=useState<string>();
    const [postData,setPostData]=useState<Post>();

    const { data:postsData } = useQuery({
        queryKey:["posts",currentPage,take,userId],
        queryFn:async ()=>fetchPosts(currentPage,take,userId),
    })

    useEffect(() => {
        if(currentPostSlug){
            fetchPost(currentPostSlug).then((res)=>{
                setPostData(res);
            })
        }
    }, [currentPostSlug]);


    return (
        <div className="flex flex-col h-auto w-full items-center ">
            {editMode?
                (<>
                    {postData?( <PostForm post={postData} setEditMode={setEditMode}
                               editMode={editMode}/> ):(<></>)}
                </>):
    (<div>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
        {label}
    </h2>
        {postsData?.posts.map((post:Post)=>(
            <div key={post.id} className="w-full flex mb-2 items-center justify-center">
                <PostCard post={post} setEditMode={setEditMode} setCurrentPostSlug={setCurrentPostSlug}/>
            </div>
        ))}
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} take={take} count={postsData?.count} />
    </div>)}



        </div>
    );
}