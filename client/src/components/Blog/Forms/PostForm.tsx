"use client"
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import { useState} from "react";
import {useDraftStore, useUserStore} from "@/store/zustand";
import Preview from "@/components/Blog/Preview";
import PostEditingFields from "@/components/Blog/Forms/PostEditingFields";
import Markdownupload from "@/components/Blog/Markdownupload";
import submitPost from "@/actions/client/submit-post";
import {updatePost} from "@/actions/client/update-post";

const schema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(20, "Post text must be at least 20 characters long"),
});

export default function AddNewPost() {

    type Schema = z.infer<typeof schema>

    const [isMatter, setIsMatter] = useState<boolean>(false);
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);
    const [isPreview, setIsPreview ]= useState<boolean>(false);


    const { register, setValue,getValues ,reset,setError,
        formState: { errors,isValid }, } = useForm<Schema>({ mode: 'onChange' ,
        resolver: zodResolver(schema),
    })

    const postId = useDraftStore((state) => state.id);


    const userId = useUserStore((state) => state.id);
    const router=useRouter();

    async function onSubmit(values:z.infer<typeof schema>,isDraft){
        if (postId){
            const res:Response=await updatePost(values.title,values.description,isDraft,userId,postId)
            if(res.ok){
                reset();
                router.push("/profile")
            }else{
                const error=await res.json();
                setError("title", { type: "custom", message: error.message })
            }

        }else{
            const res:Response=await submitPost(values.title,values.description,isDraft,userId)
            if(res.ok){
                reset();
                router.push("/profile")
            }else{
                const error=await res.json();
                setError("title", { type: "custom", message: error.message })
            }
        }
    }


    function onPublish() {
        const values = getValues();
        onSubmit(values, true);
    }

    function onDraft() {
        const values = getValues();
        onSubmit(values, false);
    }



    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 ">
            <form  className="flex flex-col gap-5 w-full">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Create new post
                </h1>

                <div className="">
                    <div className="flex flex-row justify-between items-center mb-2">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {isPreview?"Preview":""}
                        </h3>
                        <div className="flex flex-row gap-2 justify-end items-center ">

                            <Markdownupload setValue={setValue} setIsMatter={setIsMatter} setMarkdownHtml={setMarkdownHtml}/>
                            <Button className="" type="button" onClick={()=>{setIsPreview(!isPreview)}}>{isPreview?"Edit":"Preview"}</Button>
                        </div>
                    </div>
                    <div className="  w-full overflow-auto p-1">
                        {isPreview ?(
                                <Preview isMatter={isMatter} markdownHtml={markdownHtml} getValues={getValues}/>):
                            (<PostEditingFields register={register} setValue={setValue} setIsMatter={setIsMatter} setMarkdownHtml={setMarkdownHtml} errors={errors} />)}

                    </div>

                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button  type="button" name="draft" disabled={!isValid} onClick={onDraft}>Save Draft</Button>
                    <Button  type="button" name="publish" disabled={!isValid} onClick={onPublish}>Publish</Button>

                </div>
            </form>

        </div>
    );
}
