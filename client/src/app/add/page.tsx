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
import PostEditingField from "@/components/Blog/PostEditingField";
import Markdownupload from "@/components/Blog/Markdownupload";

const schema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(20, "Post text must be at least 20 characters long"),


});

export default function AddPost() {

    type Schema = z.infer<typeof schema>

    const [isMatter, setIsMatter] = useState<boolean>(false);
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);
    const [isPreview, setIsPreview ]= useState<boolean>(false);




    const { register, setValue,getValues ,reset,
        formState: { errors,isValid }, } = useForm<Schema>({ mode: 'onChange' ,
        resolver: zodResolver(schema),
    })

    const post_id = useDraftStore((state) => state.id);


    const id = useUserStore((state) => state.id);
    const route=useRouter();


    async function submitPost(values:z.infer<typeof schema>,isDraft:boolean){

        const res=await fetch("/api/post/edit",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(post_id?{
                title:values.title,
                description:values.description,
                slug:slugify(values.title),
                published: isDraft,
                userId:id,
                id:post_id,
            }:{
                title:values.title,
                description:values.description,
                slug:slugify(values.title),
                published: isDraft,
                userId:id,
            })
        })
        if (res.ok) {
            console.log(res);
            reset();
            useDraftStore.setState({id:""})

            route.push("/profile");


          }else{
              console.error("failed")
            console.log(res);
              //show error message here from res
          }

    }


    function onPublish(){
            const values=getValues();
            console.log("values",values)
            submitPost(values,true);
    }

    function onDraft(){
        const values=getValues();
        console.log("values",values)
        submitPost(values,false);
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
                            (<PostEditingField register={register} setValue={setValue} setIsMatter={setIsMatter} setMarkdownHtml={setMarkdownHtml} errors={errors}/>)}

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
