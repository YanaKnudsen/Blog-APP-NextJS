import {withAuth} from "next-auth/middleware"



export default withAuth(
    function middleware(){


    },{
        callbacks:{
            //here check if tokens are the same
        }
    }
)

export const config={matcher:["/profile","/add"]}