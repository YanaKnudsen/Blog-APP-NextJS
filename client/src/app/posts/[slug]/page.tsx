"use client"
import {useRouter} from "next/navigation";
import {useEffect} from "react"


export default function PostPage({key,item}) {
    const router = useRouter();
    console.log("router",router)
  //  const { post } = router.query;
  /*  useEffect(() => {
        if(!post) {
            return;
        }
        const fetchSomethingById = async () => {
            const response = await fetch(`/api/something/${id}`)
        }
        fetchSomethingById()
    }, [post])*/
    return (
        <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
            back to blog button
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Title of the post
            </h1>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Description
            </h4>
            image here
            line
            Text
            Comments in the end


        </div>
    );
}
