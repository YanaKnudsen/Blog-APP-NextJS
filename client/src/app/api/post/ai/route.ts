import {NextResponse} from "next/server";
import openai from "@/utils/openai"

export async function POST(req: Request) {
    //const userPrompt="Write a blog post about next js"
    try{
        const body=await req.json();
        const chatCompletionDescription = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `${body.userPrompt}.Write it as a blog post for a coding blog in a markdown format. Don't write more than 300 symbols.Don't include backquotes.` }],
            model: 'gpt-4o-mini',
        });
        const chatCompletionTitle = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Write a title related to the following blog post:${chatCompletionDescription.choices[0].message.content}. Make it maximum 7 symbols. Avoid quotation marks` }],
            model: 'gpt-4o-mini',
        });

        return NextResponse.json({AIDescription:chatCompletionDescription.choices[0].message.content,AITitle:chatCompletionTitle.choices[0].message.content}, { status:200 })
    }catch{
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }

}