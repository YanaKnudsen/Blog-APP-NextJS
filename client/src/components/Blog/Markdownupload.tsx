"use client"


import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useRef} from "react";
import {markdownToHTML} from "@/helpers";
import {UseFormSetValue} from "react-hook-form";
import {useTranslations} from "next-intl";

export default function Markdownupload({setValue,setIsMatter}:{setValue:UseFormSetValue<{ title: string; description: string; }>,setIsMatter:Dispatch<SetStateAction<boolean>>}) {

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    function handleClick(){
        hiddenFileInput.current?.click();
    };
    async function readFile(e: React.ChangeEvent<HTMLInputElement>){
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text:string = e.target?.result as string;
            setValue("description", text, { shouldValidate: true });
            const { title: matterTitle } = await markdownToHTML(text);
            if(matterTitle){
                setValue("title",matterTitle, { shouldValidate: true });
                setIsMatter(true);
            }
            if (hiddenFileInput.current) {
                hiddenFileInput.current.value = ""; // Safely assign the value
            }

        };
        if(e.target.files){
            reader.readAsText(e.target.files[0]);
        }


    }
    const t = useTranslations('EditPost');

    return (
        <div>
            <input  ref={hiddenFileInput} type="file" name="uploadMarkdown" className="hidden" onChange={(e)=>
            readFile(e)}/>
    <Button className="" type="button" onClick={handleClick} >{t('importMarkdown')}</Button>
        </div>

    );
}