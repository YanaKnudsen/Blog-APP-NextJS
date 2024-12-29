"use client"
import PostTitle from "@/components/Blog/PostTitle";


export default function Preview({isMatter,getValues,markdownHtml}:{isMatter:boolean,getValues:()=>void,markdownHtml:string|null}) {


    return (
        <div>
            <div className="">
                {!isMatter && (<PostTitle title={getValues("title")}/>)}
                {markdownHtml &&  <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html:  markdownHtml|| ""  }}  />}</div>

        </div>
    );
}