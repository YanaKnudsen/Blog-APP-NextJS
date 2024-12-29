import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";


//edit new post
export async function GET(req: Request) {
    const {searchParams}=new URL(req.url);
    const page:string|null=searchParams.get("page")
    const take:string|null=searchParams.get("take")
    const id :string|null=searchParams.get("id")
    console.log("id",id)



    const pageNumber:number = page ? Number(page) : 1; // Default to 1 if null
    const takeNumber:number  = take ? Number(take) : 10; // Default to 10 if null
    const query={
        take: takeNumber,
        skip: takeNumber * (pageNumber - 1),
        include: {
            user: true,
            post:true,
        },
        ...(id ? { where: { postId: id } } : {}),

    }
    try {
        const [comments,count]=await prisma.$transaction([
            prisma.comment.findMany(query),
            prisma.comment.count({
                ...(id ? { where: { postId: id } } : {}),
            }),
        ])
       // revalidatePath(`/posts/${slug}`)
        return NextResponse.json({comments,count}, { status:200 })

    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Unexpected error"}, { status:500 })

    }

}