import Posts from "@/components/Blog/Posts";



export default function Home({ searchParams }) {
    const page = parseInt(searchParams.page) || 1;

  return (
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <main className="flex flex-row h-screen w-full ">
            <Posts currentPage={page} label={"Discover all posts"} />
        </main>
    </div>
  );
}
