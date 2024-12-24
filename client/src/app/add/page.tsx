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
    const [fileEnter, setFileEnter] = useState(false);

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

    const formData = new FormData();
    formData.append("file", file);

    async function saveFile(){
        console.log("saving File");
        const res=await fetch("/api/upload",{
            method:"POST",
            body: formData,
        })

    }

    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 ">
            <form onSubmit={form.handleSubmit(submitPost)} className="flex flex-col gap-5 w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Create new post
            </h1>
            <div>
            <div className="flex flex-col">
                <Button onClick={saveFile}>save img</Button>

                <div className="container px-4 max-w-5xl mx-auto">
                    {!file ? (
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setFileEnter(true);
                            }}
                            onDragLeave={(e) => {
                                setFileEnter(false);
                            }}
                            onDragEnd={(e) => {
                                e.preventDefault();
                                setFileEnter(false);
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setFileEnter(false);
                                if (e.dataTransfer.items) {
                                    [...e.dataTransfer.items].forEach((item, i) => {
                                        if (item.kind === "file") {
                                            const file = item.getAsFile();
                                            if (file) {
                                                let blobUrl = URL.createObjectURL(file);
                                                setFile(blobUrl);
                                            }
                                            console.log(`items file[${i}].name = ${file?.name}`);
                                        }
                                    });
                                } else {
                                    [...e.dataTransfer.files].forEach((file, i) => {
                                        console.log(`… file[${i}].name = ${file.name}`);
                                    });
                                }
                            }}
                            className={`${
                                fileEnter ? "border-4" : "border-2"
                            } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
                        >
                            <label
                                htmlFor="file"
                                className="h-full flex flex-col justify-center text-center"
                            >
                                Click to upload or drag and drop image
                            </label>
                            <input
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    console.log(e.target.files);
                                    let files = e.target.files;
                                    if (files && files[0]) {
                                        let blobUrl = URL.createObjectURL(files[0]);
                                        setFile(blobUrl);
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <object
                                className="rounded-md w-full max-w-xs h-72"
                                data={file}
                                type="image/png" //need to be updated based on type of file
                            />
                            <Button
                                onClick={() => setFile("")}
                                className="px-4 mt-2 py-2 rounded"
                            >
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
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
                    <Input
                        id="description"
                        type="text"
                        placeholder="What are you thinking about?"
                        required
                        {...form.register("description")}
                    />
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
