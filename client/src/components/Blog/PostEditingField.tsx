"use client"
import {useRef, useState} from "react";
import {TypographyH1} from "@/components/ui/typography/typography";
import {Post} from "@/@types/post"
import PostTitle from "@/components/Blog/PostTitle";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {markdownToHTML} from "@/helpers";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import slugify from "slugify";

const schema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(20, "Post text must be at least 20 characters long"),


});


export default function PostEditingField({register,setValue,setIsMatter,setMarkdownHtml,errors}:{}) {





    const handleMarkdownChange = async (event: React.ChangeEvent<HTMLTextAreaElement >) => {
        const input = event.target.value;
        setValue("description",input,{ shouldValidate: true })
        const { title: matterTitle, html: markdown } = await markdownToHTML(input);
        console.log("matterTitle, html: markdown",matterTitle, markdown)
        if(matterTitle){
            setValue("title",matterTitle, { shouldValidate: true });
            setIsMatter(true);
        }else{
            setIsMatter(false);
        }
        setMarkdownHtml(markdown);
    };
    const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement >) => {
        const value = event.target.value;
        setValue("title", value, { shouldValidate: true });
    }


    return (
        <div className="flex flex-col gap-2">
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



        </div>
    );
}