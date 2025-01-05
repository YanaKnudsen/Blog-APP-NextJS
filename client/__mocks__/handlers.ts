import {rest} from "msw"

const slug="My-blog"
export const handlers=[
rest.get(`/api/post/${slug}`,(req,res,ctx)=>{
    return res(ctx.status(200),
        ctx.json())
})
]