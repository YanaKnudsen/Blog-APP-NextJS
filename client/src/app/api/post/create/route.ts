import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

export async function POST(req: Request) {
    try {
        const body=await req.json();
        //check if post with such slug already exists
         const existingPost = await prisma.post.findUnique({
            where: {slug: body.slug,},
        });
        if (!existingPost) {
                const responsePost = await prisma.post.create({
                    data:body,
                });
                return NextResponse.json(responsePost, { status:200 })
        }
        else{
            return NextResponse.json({message:"Unable to save the post. Blog post with the same title already exists"}, { status:500 })
        }
    } catch {
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}