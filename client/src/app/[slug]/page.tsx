import Latest from "@/components/Posts/Latest";
import Top from "@/components/Posts/Top";
import {Button} from "@/components/ui/button";

export default function PostPage() {
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
