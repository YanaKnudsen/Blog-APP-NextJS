"use client"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";
import { remark } from 'remark';
import html from 'remark-html';
import matter from "gray-matter";
import { Textarea } from "@/components/ui/textarea"

const PostSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(1, "Post text must be at least 20 characters long")
        .max(5000, "Post text must not exceed 5000 characters")
        .regex(
            /[a-zA-Z0-9]/,
            "Post text must contain at least one alphanumeric character"
        ),


});

export default function AddPost() {
    const [file, setFile] = useState<string>();
    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);

        async function fetchMarkdown() {
            const res = await fetch("/api/read-markdown");
            if (res.ok) {
                const data = await res.json();
                // Use gray-matter to parse the post metadata section
                const matterResult = matter(data);
                console.log("matter",matterResult);
                // Use remark to convert markdown into HTML string
                const processedContent = await remark()
                    .use(html)
                    .process(matterResult.content);
                const contentHtml = processedContent.toString();
                console.log(contentHtml)
                setMarkdownHtml(contentHtml);
            }
        }



    const form= useForm<typeof PostSchema>({
        resolver: zodResolver(PostSchema),
    });
    async function submitPost(values:z.infer<typeof PostSchema>){
        console.log("values",values)
        const res=await fetch("/api/post/create",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:values.title,
                description:values.description,
                slug:slugify(values.title),
            })
        })
        if (res.ok) {
            console.log(res);
            if(file){
                //save file here
            }

        }else{
            console.error("failed")
            //show error message here from res
        }

    }


    async function readFile(){
        console.log("reading Markdown file");
        fetchMarkdown();
      //  const files=fs.readdirSync(`${process.cwd()}/content,'utf-8'`)



    }

    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 ">
            <form onSubmit={form.handleSubmit(submitPost)} className="flex flex-col gap-5 w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Create new post
            </h1>
            <div>
            <div className="flex flex-col">
                <Button onClick={readFile}>add markdown</Button>
                {markdownHtml &&  <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html:  markdownHtml|| ""  }}  />}

            </div>
            </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Post title"
                        required
                        {...form.register("title")}
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-500 text-sm">
                            {form.formState.errors.title.message}
                        </p>
                    )}
                </div>
                <div className="">
                    <Label htmlFor="name">Description</Label>
                    <Textarea placeholder="What are you thinking about?" id="description" required  {...form.register("description")}/>
                    {form.formState.errors.description && (
                        <p className="text-red-500 text-sm">
                            {form.formState.errors.description.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <Button>Save draft</Button>
                    <Button>Preview</Button>
                </div>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </div>
            </form>

        </div>
    );
}
