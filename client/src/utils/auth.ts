import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/utils/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {compare} from "bcrypt";
import {AuthOptions, Session, User} from "next-auth";
import {JWT} from "next-auth/jwt";


export const authOptions:AuthOptions ={
    adapter:PrismaAdapter(prisma),
    session:{
        strategy:'jwt'
    },
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "sample@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Please fill in the form to login');
                }
                //find user in the database better fetc api
                const user=await prisma.user.findUnique({
                    where:{email:credentials?.email}
                });
                if(user){
                    const passwordOk=await compare(credentials.password,user.password?? "");
                    if (passwordOk){
                        return user
                    }else{
                        throw new Error('Password is incorrect');
                    }

                }else{
                    throw new Error('User with this email is not registered');
                }
            }
        })

    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({ session, token }:{session:Session, token:JWT}) {
            // Attach token or user data to session if needed
            if (session.user) {
                session.user.id=token?.id
            }
            return session;
        },
        async jwt({ token, user }:{ token:JWT, user:User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

    },

}
