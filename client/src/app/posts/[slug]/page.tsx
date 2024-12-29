import {QueryClient,HydrationBoundary,dehydrate} from "@tanstack/react-query";
import fetchData from "@/actions/server/fetch-post";
import PostInfo from "@/components/Blog/PostInfo";
import {markdownToHTML} from "@/helpers";
import CommentForm from "@/components/Comments/Forms/CommentForm";
import Comments from "@/components/Comments/Lists/Comments";
import fetchComments from "@/actions/client/fetch-comments";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {TypographyH3} from "@/components/ui/typography/typography";





export default async function PostPage(props: { params: Promise<{ slug: string ,page:string  }> }) {
    const queryClient = new QueryClient()
    const {  params} = props;
    const resolvedSearchParams = await params;
    const page =  parseInt(resolvedSearchParams.page??"1") || 1;
    const {slug}=resolvedSearchParams
    console.log("page",page)
    console.log("slug",slug)


    const postData= await fetchData(slug);
    const { title: matterTitle, html: markdown } = await markdownToHTML(postData.description);
    const title = matterTitle? "" : postData.title;
    const postId=postData.id;
    const session = await getServerSession(authOptions);



    await queryClient.prefetchQuery({
        queryKey:["comments",page,postId,slug],
        queryFn:()=>fetchComments(page,postId,slug),
    })
    const dehydratedState = dehydrate(queryClient);



    return (
        <HydrationBoundary state={ dehydratedState}>
            <div className="p-4">
                <PostInfo post={postData} markdown={markdown} title={title}/>
                <TypographyH3 >Comments</TypographyH3>
                {session && <CommentForm post={postData}/>}
                <Comments post={postData}/>
            </div>
        </HydrationBoundary>

    );
}