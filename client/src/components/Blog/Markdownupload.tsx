"use client"


import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useRef} from "react";
import {markdownToHTML} from "@/helpers";
import {UseFormSetValue} from "react-hook-form";

export default function Markdownupload({setValue,setIsMatter,setMarkdownHtml}:{setValue:UseFormSetValue<{ title: string; description: string; }>,setIsMatter:Dispatch<SetStateAction<boolean>>,setMarkdownHtml:Dispatch<SetStateAction<string | null>>}) {

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    function handleClick(){
        hiddenFileInput.current.click();
    };
    async function readFile(e){
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log("button text",text)
            setValue("description", text, { shouldValidate: true });
            const { title: matterTitle, html: markdown } = await markdownToHTML(text);
            if(matterTitle){
                setValue("title",matterTitle, { shouldValidate: true });
                setIsMatter(true);
            }
            setMarkdownHtml(markdown);
            hiddenFileInput.current.value=""

        };
        reader.readAsText(e.target.files[0]);

    }

    return (
        <div>
            <input  ref={hiddenFileInput} type="file" name="uploadMarkdown" className="hidden" onChange={(e)=>
            readFile(e)}/>
    <Button className="" type="button" onClick={handleClick} >Import markdown</Button>
        </div>

    );
}