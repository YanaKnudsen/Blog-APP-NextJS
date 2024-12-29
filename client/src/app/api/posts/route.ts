import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";



//edit new post
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
    const takeNumber:number  = take ? Number(take) : 4; // Default to 10 if null
    const query:object={
        take: takeNumber,
        skip: takeNumber * (pageNumber - 1),
     //   ...(userId ? { where: { userId: userId } } : {where: { published: true }}),
        where: userId
            ? { userId: userId } // Filter by userId if provided
            : { published: true },
        include: { user: true },
        orderBy: { createdAt: 'desc' },

    }
    try {
        const [posts,count]=await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({
               // ...(userId ? {where: {userId: userId}} : {where: { published: true } }),
                where: userId
                    ? { userId: userId } // Filter by userId if provided
                    : { published: true },
            }),
        ])

        return NextResponse.json({posts,count}, { status:200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}