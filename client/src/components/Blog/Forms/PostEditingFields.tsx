"use client"
import {Dispatch, SetStateAction, useEffect} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {markdownToHTML} from "@/helpers";
import {useDraftStore} from "@/store/zustand";
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";



export default function PostEditingFields({register,setValue,setIsMatter,setMarkdownHtml,errors}:{register:UseFormRegister<{ title: string; description: string; }>,setValue:UseFormSetValue<{ title: string; description: string; }>,setIsMatter:Dispatch<SetStateAction<boolean>>,setMarkdownHtml: Dispatch<SetStateAction<string|null>>,errors:FieldErrors<{ title: string; description: string; }>}) {

    const title = useDraftStore((state) => state.title);
    const description = useDraftStore((state) => state.description);


    useEffect(() => {
        if(title){
            setValue("title",title,{ shouldValidate: true });
            setValue("description",description,{ shouldValidate: true })
            useDraftStore.setState({title:""})
            useDraftStore.setState({description:""})
            handleMarkdownChange(description);

        }
    });



    const handleMarkdownChange = async (input:string) => {
        setValue("description",input,{ shouldValidate: true })
        const { title: matterTitle, html: markdown } = await markdownToHTML(input);
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
                          onChangeCapture={(e)=> {
                              handleMarkdownChange(e.target.value)
                          }}
                          className="min-h-[350px] max-h-[350px]"
                          {...register("description")}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>



        </div>
    );
}