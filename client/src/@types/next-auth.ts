import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id: string|undefined;
        } & DefaultSession["user"];
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string|undefined; // Add custom properties to the JWT token
    }
}

