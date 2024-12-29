import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/utils/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {compare} from "bcrypt";
import {AuthOptions} from "next-auth";



export const authOptions:AuthOptions ={
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
                if(!credentials?.email || !credentials?.password){
                    return null;
                }
                //find user in the database better fetc api
                const user=await prisma.user.findUnique({
                    where:{email:credentials?.email}
                });
                if(user){
                    const passwordOk=await compare(credentials.password,user.password);
                    if (passwordOk){
                        return user
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
    callbacks: {
        async session({ session, token }) {
            // Attach token or user data to session if needed
            session.user.id = token?.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

    },

}
