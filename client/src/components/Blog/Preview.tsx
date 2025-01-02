"use client"
import PostTitle from "@/components/Blog/PostTitle";
import {useEffect, useState} from "react";
import {markdownToHTML} from "@/helpers";


export default function Preview({isMatter,getValues}:{isMatter:boolean,getValues: (payload?: string | string[]) => string}) {
    const [markdown,setMarkdown]=useState<string>()
    useEffect(() => {
        const description=getValues("description")
        if(description){
            markdownToHTML(description).then((res)=>{
                setMarkdown(res.html)
            })
            setMarkdown(markdown)
        }

    }, []);
    return (
        <div>
            <div className="">
                {!isMatter && (<PostTitle title={getValues("title")}/>)}
                {markdown&&  <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html:  markdown|| ""  }}  />}</div>

        </div>
    );
}