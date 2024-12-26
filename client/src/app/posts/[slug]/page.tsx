import {QueryClient,HydrationBoundary,dehydrate,useQuery} from "@tanstack/react-query";
import fetchData from "../../../server/actions/fetch-post";
import PostInfo from "@/components/Blog/PostInfo";
import {markdownToHTML} from "@/helpers";
import CommentForm from "@/components/Forms/CommentForm";
import Comments from "@/components/Comments/Comments";
import fetchComments from "@/server/actions/fetch-comments";
import fetchPosts from "@/server/actions/fetch-posts";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {TypographyH3} from "@/components/ui/typography/typography";





export default async function PostPage({ params }: { params: { slug: string ,page:string } }) {
    const queryClient = new QueryClient()
    const page = parseInt(params.page) || 1;
    const { slug } = params;
    const postData= await fetchData(slug);
    const { title: matterTitle, html: markdown } = await markdownToHTML(postData.description);
    const title = matterTitle? "" : postData.title;
    const postId=postData.id;
    const session = await getServerSession(authOptions);



    await queryClient.prefetchQuery({
        queryKey:["comments",page,postId,slug],
        queryFn:fetchComments(page,postId,slug),
    })
    const dehydratedState = dehydrate(queryClient);



    return (
        <HydrationBoundary state={ dehydratedState}>
            <div className="p-4">
                <PostInfo post={postData} markdown={markdown} title={title}/>
                <TypographyH3 htmlFor="comment">Comments</TypographyH3>
                {session && <CommentForm post={postData}/>}
                <Comments post={postData}/>
            </div>
        </HydrationBoundary>

    );
}