import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server";
import type { NextRequest } from 'next/server'


export default withAuth(
    function middleware(request:NextRequest){
       // const url = request.nextUrl.clone()
      //  url.pathname = '/dest'
        //  return NextResponse.rewrite(url)
        console.log("path",request.nextUrl.pathname)
      //  console.log("token",request.nextauth.token)
    },{
        callbacks:{
            //here check if tokens are the same
        }
    }
)

export const config={matcher:["/profile","/add"]}