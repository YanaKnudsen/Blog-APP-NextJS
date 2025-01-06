"use client"
import {Post} from "@/@types/post"
import PostTitle from "@/components/Blog/PostTitle";
import remarkGfm from 'remark-gfm'
import Markdown from "react-markdown";
import remarkFrontmatter from 'remark-frontmatter'
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function PostInfo({post,title = ""}:{post:Post,title:string}) {


    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>{post?.user.name}</div>
                <p className="mt-2">{post.createdAt.split("T")[0]}</p>
            </div>

            {title && <PostTitle title={title}/>}

            {/*<div className="prose" dangerouslySetInnerHTML={{ __html:  markdown|| ""  }}  />*/}
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
                      }} className="markdown">{post.description}</Markdown>
        </div>
    );
}