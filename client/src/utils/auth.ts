import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/utils/db";
import {PrismaAdapter} from "@auth/prisma-adapter";




export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
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
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                //try with const
                const user ={id:'cm505rx9a0000h5mcq08zugcn',email:"yana@qnudsen.com",password:"test"}
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                //get data from the database
                if (credentials?.email ===user.email && credentials?.password===useer.password) {
                    return user;
                }else{
                    return null;
                }

                {/*
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
                }

                if (!user || !(await compare(credentials.password, user.password))) {
                    return null;
                }
            */}

                {/*
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        randomKey: "Some random Key",
                    };*/
                }

                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                {/*
                    const res = await fetch("/your/endpoint", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"}
                    })
                    const user = await res.json()

                    // If no error and we have user data, return it
                    if (res.ok && user) {
                        return user
                    }
                    // Return null if user data could not be retrieved
                    return null
               */ }
            }
        })

    ],

})