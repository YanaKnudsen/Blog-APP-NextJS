"use client"
import PostTitle from "@/components/Blog/PostTitle";
import {useEffect, useState} from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export default function Preview({isMatter,getValues}:{isMatter:boolean,getValues: (payload?: string | string[]) => string}) {
    const [markdown,setMarkdown]=useState<string>()
    useEffect(() => {
        const description=getValues("description")
        console.log("description",description)
        if(description){
            /* markdownToHTML(description).then((res)=>{
                setMarkdown(res.html)
            })*/
            setMarkdown(description)
        }

    }, []);
    return (
        <div>
            <div className="">
                {!isMatter && (<PostTitle title={getValues("title")}/>)}
                {/*markdown&&  <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html:  markdown|| ""  }}  />*/}
                <Markdown remarkPlugins={[remarkGfm,remarkFrontmatter]}  rehypePlugins={[rehypeRaw]}
                          components={{
                              code(props) {
                                  const {inline, className, children, ...rest} = props
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                      <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                                          {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                  ) : (
                                      <code {...rest} className={className}>
                                          {children}
                                      </code>
                                  )
                              }
                          }} className="markdown">{markdown}</Markdown>

        </div>

        </div>
    );
}