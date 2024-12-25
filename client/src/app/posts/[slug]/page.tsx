"use client"
import {useEffect, use, useState} from "react";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/components/ui/textarea";
import {z} from "zod";
import slugify from "slugify";
import {useUserStore} from "@/store/zustand";

const schema = z.object({
    comment: z
        .string()
        .min(1, "Title must be at least 5 characters long")


});


export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { slug } = use(params);
    const [post,setPost]=useState();
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);
    const [comments, setComments] = useState([]);
    const name = useUserStore((state) => state.name);
    const id = useUserStore((state) => state.id);
    useEffect(() => {
        fetchData(slug);
        getComments();


    }, []);

    const { register, setValue,getValues,handleSubmit ,setError,reset,
        formState: { errors }, } = useForm<Schema>({
        resolver: zodResolver(schema),
    })


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
    async function submitComment(values:z.infer<typeof schema>){
        const res=await fetch("/api/comment/add",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                content:values.comment,
                userId:id,
            })
        })
        if (res.ok) {
            console.log("saved")
            reset();


        }else{
            console.error("failed")
            //show error message here from res
        }

    }

    async function getComments(page:number){
        const res=await fetch(`/api/comment/get`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            },
        })
        if(res.ok){
            const { comments, count } = await res.json();
            console.log("posts, count ",comments, count )
            setComments(comments);

        }

    }


    return (<div>
        <div className="p-8">
            <div className="flex flex-row justify-between">
                <div>{post?.user.name}</div>
                <p className="mt-2">{post.createdAt.split("T")[0]}</p>
            </div>

            <div className="prose" dangerouslySetInnerHTML={{ __html:  markdownHtml|| ""  }}  />

        </div>
            <form onSubmit={handleSubmit(submitComment)}  className="flex flex-col gap-5 w-full">
                <div className="">
                    <div className="  w-full overflow-auto p-1">


                        <div className="flex flex-col gap-2">

                                <div className="grid gap-2">
                                    <Label htmlFor="comment">Comments</Label>
                                    <Textarea placeholder="Add your comment..."
                                              id="comment"
                                              required
                                              //onChangeCapture={handleMarkdownChange}
                                              className="min-h-[100px] max-h-[150px]"
                                              {...register("comment")}
                                    />
                                    {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                                </div>



                            </div>

                    </div>

                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button  type="submit">Submit</Button>

                </div>
            </form>
            <div>
                {comments?.map((comment)=>(
                    <div key={comment.id}>
                        {comment.user.name}
                        {comment.content}

                    </div>
                ))}

            </div>
        </div>
    );
}