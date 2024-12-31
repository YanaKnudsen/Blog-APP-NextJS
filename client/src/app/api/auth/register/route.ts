import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";
import {hash} from "bcrypt";
import {z} from "zod";

//zod for input
const userSchema = z.object({
    name: z.string().min(2, { message: "Full name must be at least 3 characters long" }) // Minimum length
        .max(100, { message: "Full name must not exceed 100 characters" }) // Maximum length
        .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
            message: "Full name must include at least a first and last name",
        }),
    email: z
        .string().min(1,"Email is required")
        .email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Uppercase
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Lowercase
        .regex(/\d/, { message: "Password must contain at least one number" }) // Number
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one special character",
        }),
});

//edit new user
export async function POST(req: Request) {
    //return NextResponse.json({success:true})
    try {
        const body = await req.json()
        const {name,email,password}=userSchema.parse(body);

        //check if this user already exists in the database
        const existingUser=await prisma.user.findUnique({
            where:{email:email}
        });
        if(existingUser) {
            return NextResponse.json({user:null,message:"User with this email already exists"},{status:409})
        }
        //edit new user to the database
        //edit random salt
        const hashedPassword=await hash(password,10) ;
        await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })

        return NextResponse.json({message:"User created successfully"},{status:201})
    } catch (err) {
        return NextResponse.json({err,message:"Unexpected error"},{status:500})
    }
}