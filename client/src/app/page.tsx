import Posts from "@/components/Blog/Posts";
import {QueryClient,HydrationBoundary,dehydrate,useQuery} from "@tanstack/react-query";
import fetchComments from "@/server/actions/fetch-comments";
import fetchPosts from "@/server/actions/fetch-posts";



export default async function Home({ searchParams }:{ searchParams: { page:string } }) {
    const queryClient = new QueryClient()
    const page = parseInt(searchParams.page??"1") || 1;
    console.log("page",page);
    await queryClient.prefetchQuery({
        queryKey:["posts",2,4],
        queryFn:fetchPosts(2,4),
    })
    const dehydratedState = dehydrate(queryClient)

  return (
      <HydrationBoundary state={ dehydratedState}>
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <main className="flex flex-row h-screen w-full ">
            <Posts page={page} label={"Discover all posts"} id={""}/>
        </main>
    </div>
      </HydrationBoundary>
  );
}
