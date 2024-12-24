"use client"
import {useEffect, use, useState} from "react";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { slug } = use(params);
    const [post,setPost]=useState();
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);

    useEffect(() => {
        fetchData(slug);

    }, []);

    async function fetchData (slug) {
        const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
            cache: "no-store",
        });

        if(res.ok){
            const data=await res.json();
            setPost(data);


        }
    };




    useEffect(() => {
        if (post) {
            markdownToHTML()
        }
    }, [post]);
    if (!post) {
        return <div>Loading...</div>;
    }

    async function markdownToHTML(){
        if(post){
            console.log("matterResult",typeof post?.description)
            const matterResult = matter(post?.description);
            console.log("matterResult",matterResult)


            if(matterResult.data.title){

                const matterTitle  = matterResult.data.title;
                // Convert Markdown to HTML
                const processedContent = await remark().use(html).process(matterResult.content);
                const mark=processedContent.toString();
                setMarkdownHtml(processedContent.toString());
            }else{
                // Convert Markdown to HTML

                const processedContent = await remark().use(html).process(post?.description);
                setMarkdownHtml(processedContent.toString());
            }
        }
    }

    return (
        <div className="p-8">
            <div className="flex flex-row justify-between">
                <div>{post?.user.name}</div>
                <p className="mt-2">{post.createdAt.split("T")[0]}</p>
            </div>

            <div className="prose" dangerouslySetInnerHTML={{ __html:  markdownHtml|| ""  }}  />

        </div>
    );
}