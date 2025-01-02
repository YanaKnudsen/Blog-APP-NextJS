import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";


export async function POST(req: Request) {
    try {
        const body=await req.json();
         const existingPost = await prisma.post.findUnique({
           where:{
              slug: body.slug,
              NOT:{id:body.postId}}
       });
       if (!existingPost) {
               // Update the existing post
               const updatedPost = await prisma.post.update({
                    where: {
                        id: body.postId,
                    },
                    data: {
                        title: body.title,
                        description: body.description,
                        published: body.published,
                        userId: body.userId,
                        slug:body.slug,
                    },
                });
                return NextResponse.json(updatedPost, { status:200 })

       }
       else{
           return NextResponse.json({message:"Unable to save the post. Blog post with the same title already exists"}, { status:500 })
       }

    } catch {
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}