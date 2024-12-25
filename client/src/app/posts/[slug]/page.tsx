import {QueryClient,HydrationBoundary,dehydrate,useQuery} from "@tanstack/react-query";
import fetchData from "../../../server/actions/fetch-post";
import PostInfo from "@/components/Blog/PostInfo";
import {markdownToHTML} from "@/helpers";
import CommentForm from "@/components/Forms/CommentForm";
import Comments from "@/components/Comments/Comments";





export default async function PostPage({ params }: { params: { slug: string } }) {
    const queryClient=new QueryClient();
    const { slug } = params;
    console.log("slug",slug)
    const postData= await fetchData(slug);
    const { title: matterTitle, html: markdown } = await markdownToHTML(postData.description);
    const title = matterTitle? "" : postData.title;
    console.log(title)

    /*




    //prefetch posts
      const { isPending, error, data ,fetchStatus} = useQuery({
          queryKey: ['comments'],
          queryFn: fetchComments()
      })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


    async function getComments(page:number,id:string,slug:string){
                const res=await fetchComments(page,id,slug);
                setComments(res.comments);
    }

*/
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="p-4">
            <PostInfo post={postData} markdown={markdown} title={title}/>
            <CommentForm post={postData}/>
            <Comments post={postData}/>
        </div>
        </HydrationBoundary>
    );
}