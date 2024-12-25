import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";
import slugify from "slugify";

//create new post
export async function POST(req: Request) {
    try {
        const body=await req.json();
        console.log("data",body)
        const existingPost = await prisma.post.findUnique({
            where: {
                slug: body.slug,
            },
        });
        if (existingPost) {
            console.log("this post exists")
            // Update the existing post
            responsePost = await prisma.post.update({
                where: {
                    slug: body.slug,
                },
                data: {
                    title: body.title,
                    description: body.description,
                    published: body.published,
                    userId: body.userId,
                },
            });
            console.log("Post updated:", responsePost);
        }else{
            const newPost=await prisma.post.create({
                data: body,
            });
        }


        return new NextResponse(JSON.stringify(newPost,{status:200}));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({message:"Unexpected error"},{status:500}));

    }
}