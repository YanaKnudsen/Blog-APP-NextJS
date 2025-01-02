import CommentForm from "@/components/Comments/Forms/CommentForm";
import Comments from "@/components/Comments/Lists/Comments";
import {TypographyH3} from "@/components/ui/typography/typography";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import fetchComments from "@/actions/client/fetch-comments";
import {Post} from "@/@types/post";
import {QueryClient,HydrationBoundary,dehydrate} from "@tanstack/react-query";
import {getTranslations} from "next-intl/server";





export default async function currentPage({page,post}:{page:number,post:Post}) {
    const queryClient = new QueryClient()
    const session = await getServerSession(authOptions);
    const postId=post.id;
    const slug=post.slug;
    await queryClient.prefetchQuery({
        queryKey:["comments",page,postId,slug],
        queryFn:()=>fetchComments(page,postId,slug),
    })
    const dehydratedState = dehydrate(queryClient);
    const t = await getTranslations('PostPage');


    return (
        <HydrationBoundary state={ dehydratedState}>
        <TypographyH3 >{t('comments')}</TypographyH3>
    {session && <CommentForm postId={postId}/>}
    <Comments postId={postId} slug={slug}/>
        </HydrationBoundary>

    );
}