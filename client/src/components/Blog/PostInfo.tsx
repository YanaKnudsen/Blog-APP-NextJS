"use client"
import {Post} from "@/@types/post"
import PostTitle from "@/components/Blog/PostTitle";

export default function PostInfo({post,markdown,title = ""}:{post:Post,markdown:string,title:string}) {


    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>{post?.user.name}</div>
                <p className="mt-2">{post.createdAt.split("T")[0]}</p>
            </div>

            {title && <PostTitle title={title}/>}

            <div className="prose" dangerouslySetInnerHTML={{ __html:  markdown|| ""  }}  />
        </div>
    );
}