import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

//edit new post
export async function POST(req: Request) {
    try {
        const body=await req.json();
        console.log("data",body)
         const existingPost = await prisma.post.findUnique({
           where:{
              slug: body.slug,
               NOT:{id:body.id}}

       });
       console.log("existingPost",existingPost)
       if (!existingPost) {
           if(body.id){
               // Update the existing post
               const responsePost = await prisma.post.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        title: body.title,
                        description: body.description,
                        published: body.published,
                        userId: body.userId,
                        slug:body.slug,
                    },
                });
                console.log("Post updated:", responsePost);
               return NextResponse.json(responsePost, { status:200 })

           }else{
               console.log("creating post")
               const responsePost = await prisma.post.create({
                   data:body,
               });

               console.log("Post created:", responsePost);
               return NextResponse.json(responsePost, { status:200 })
           }

       }
       else{
           return NextResponse.json({message:"Unexpected error"}, { status:500 })
       }

    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}