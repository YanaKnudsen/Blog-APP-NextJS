"use client"
import {useState} from "react";

export default function PostInfo({post,markdown}) {
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);


    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>{post?.user.name}</div>
                <p className="mt-2">{post.createdAt.split("T")[0]}</p>
            </div>

            <div className="prose" dangerouslySetInnerHTML={{ __html:  markdown|| ""  }}  />
        </div>
    );
}