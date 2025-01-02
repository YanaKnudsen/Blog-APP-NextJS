import Posts from "@/components/Blog/Posts";
import {QueryClient,HydrationBoundary,dehydrate} from "@tanstack/react-query";
import fetchPosts from "@/actions/client/fetch-posts";
import {getTranslations} from 'next-intl/server';


export default async function Home( props: { searchParams: Promise<{ page: string }> }) {
    const queryClient = new QueryClient()
    const {  searchParams } = props;
    const resolvedSearchParams = await searchParams;
    const page =  parseInt(resolvedSearchParams.page??"1") || 1;
    const t = await getTranslations('HomePage');


    await queryClient.prefetchQuery({
        queryKey:["posts",page],
        queryFn: () => fetchPosts(page),
    })
    const dehydratedState = dehydrate(queryClient)

  return (
      <HydrationBoundary state={dehydratedState}>
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <main className="flex flex-row h-screen w-full ">
            <Posts page={page} label={t('title')} userId={""}/>
        </main>
    </div>
      </HydrationBoundary>
  );
}
