import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";
import slugify from "slugify";

//create new post
export async function GET(req: Request) {
    const {searchParams}=new URL(req.url);
    console.log("searchParams",searchParams)
    const page:string|null=searchParams.get("page")
    const take:string|null=searchParams.get("take")
    const userId:string|null=searchParams.get("userId")

    console.log("userId", page, take,userId)

    if( userId){
        console.log("selecting specific user with id", userId);
    }


    const pageNumber:number = page ? Number(page) : 1; // Default to 1 if null
    const takeNumber:number  = take ? Number(take) : 10; // Default to 10 if null
    const query={
        take: takeNumber,
        skip: takeNumber * (pageNumber - 1),
        ...(userId ? { where: { userId: userId } } : {where: { published: true }}),
        include: { user: true },
        orderBy: { createdAt: 'desc' },

    }
    try {
        const [posts,count]=await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({
                ...(userId ? {where: {userId: userId}} : {where: { published: true } }),
            }),
        ])

        return new NextResponse(JSON.stringify({posts,count},{status:200}));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({message:"Unexpected error"},{status:500}));

    }
}