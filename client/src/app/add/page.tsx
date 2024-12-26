"use client"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";
import { Textarea } from "@/components/ui/textarea"
import { promises as fs } from 'fs';
import {useDraftStore, useUserStore} from "@/store/zustand";
import {markdownToHTML} from "@/helpers";
import Preview from "@/components/Blog/Preview";

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

    const title = useDraftStore((state) => state.title);
    const description = useDraftStore((state) => state.description);


    useEffect(() => {
        if(title){
            setValue("title",title,{ shouldValidate: true });
            setValue("description",description,{ shouldValidate: true })
            useDraftStore.setState({title:""})
            useDraftStore.setState({description:""})
        }
    }, [title,description]);


    const { register, setValue,getValues,handleSubmit ,setError,reset,
        formState: { errors,isValid }, } = useForm<Schema>({ mode: 'onChange' ,
        resolver: zodResolver(schema),
    })


    const handleMarkdownChange = async (event: React.ChangeEvent<HTMLTextAreaElement >) => {
        const input = event.target.value;
        setValue("description",input,{ shouldValidate: true })
        const { title: matterTitle, html: markdown } = await markdownToHTML(input);
        if(matterTitle){
            setValue("title",matterTitle, { shouldValidate: true });
            setIsMatter(true);
        }
        setMarkdownHtml(markdown);





    };

    const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement >) => {
        const value = event.target.value;
        setValue("title", value, { shouldValidate: true });
    }


    const id = useUserStore((state) => state.id);
    const route=useRouter();


    async function submitPost(values:z.infer<typeof schema>,isDraft:boolean){

        const res=await fetch("/api/post/create",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
            route.push("/profile");


          }else{
              console.error("failed")
              //show error message here from res
          }

    }
    async function readFile(e){
        const uploadedFile=e.target.files?.[0];
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            setValue("description", text, { shouldValidate: true });
            const { title: matterTitle, html: markdown } = await markdownToHTML(text);
            if(matterTitle){
                setValue("title",matterTitle, { shouldValidate: true });
                setIsMatter(true);
            }
            setMarkdownHtml(markdown);

        };
       reader.readAsText(e.target.files[0]);

    }

    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };


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
            <form onSubmit={handleSubmit(submitPost)}  className="flex flex-col gap-5 w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Create new post
            </h1>
            <div>
            </div>

                <div className="">
                    <div className="flex flex-row justify-between items-center mb-2">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {isPreview?"Preview":""}
                        </h3>
                    <div className="flex flex-row gap-2 justify-end items-center ">

                         <input  ref={hiddenFileInput} type="file" name="uploadMarkdown" className="hidden" onChange={(e)=>readFile(e)}/>
                        <Button className="" type="button" onClick={handleClick} >Import markdown</Button>
                        <Button className="" type="button" onClick={()=>{setIsPreview(!isPreview)}}>{isPreview?"Edit":"Preview"}</Button>
                    </div>
                    </div>
                    <div className="  w-full overflow-auto p-1">
                        {isPreview ?(
                                <Preview isMatter={isMatter} markdownHtml={markdownHtml} getValues={getValues}/>):
                            (<div className="flex flex-col gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Post title"
                                        onChangeCapture={handleTitleChange}
                                        {...register("title")}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Content</Label>
                                    <Textarea placeholder="What are you thinking about?"
                                              id="description"
                                              required
                                              onChangeCapture={handleMarkdownChange}
                                              className="min-h-[350px] max-h-[350px]"
                                              {...register("description")}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>



                            </div>)}

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
