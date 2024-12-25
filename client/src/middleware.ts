import {withAuth,NextRequestWithAuth} from "next-auth/middleware"

export default withAuth(
    function middleware(request:NextRequestWithAuth){
       // console.log(request.nextUrl.pathname)
      //  console.log("token",request.nextauth.token)
    },{
        callbacks:{
            //here check if tokens are the same
        }
    }
)

export const config={matcher:["/profile","/add"]}