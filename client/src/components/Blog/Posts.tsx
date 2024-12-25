import fetchPosts from "../../server/actions/fetch-posts";
import {Post} from "@/@types/post";
import PostCard from "@/components/Blog/PostCard";
import PostsPagination from "@/components/Pagination";



export default async function Posts({ currentPage,label,id}) {
    const take="4";


    //fetch all posts
    const postsData:{posts:Post[],count:number}= await fetchPosts(currentPage,take,id);
    console.log("postsData",postsData);

    const hasPrev = take * (currentPage - 1) > 0;
    const hasNext = take * (currentPage - 1) + take< postsData.count;

    return (
        <div className="flex flex-col h-auto w-full items-center ">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
                {label}
            </h2>
            {postsData.posts.map((post)=>(
                <div key={post.id} className="w-full flex mb-2 items-center justify-center">
                <PostCard post={post}/>
                </div>
            ))}
            <PostsPagination currentPage={currentPage} hasPrev={hasPrev} hasNext={hasNext} pagesCount={postsData.count} />

        </div>
    );
}