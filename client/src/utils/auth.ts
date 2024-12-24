import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/utils/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {compare} from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";



export const authOptions ={
    adapter:PrismaAdapter(prisma),
    session:{
        strategy:'jwt'
    },
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "sample@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("credentials",credentials?.email,credentials?.password)
                if(!credentials?.email || !credentials?.password){
                    return null;
                }
                //find user in the database
                const user=await prisma.user.findUnique({
                    where:{email:credentials?.email}
                });
                console.log("auth user",user)
                if(user){
                    const passwordOk=await compare(credentials.password,user.password);
                    if (passwordOk){
                        return {
                            id:`${user.id}`,
                            name:user.name,
                            email:user.email
                        }
                    }else{
                        return null;
                    }

                }else{
                    return null;
                }
            }
        })

    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,

}
