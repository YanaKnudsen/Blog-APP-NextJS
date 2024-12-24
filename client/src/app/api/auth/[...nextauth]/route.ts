import NextAuth from "next-auth";
import {authOptions} from "@/utils/auth";
//const handler=NextAuth(authOptions);
const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
export const { GET, POST } = handlers