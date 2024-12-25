
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {Button} from "@/components/ui/button";
import {Post} from "@/@types/post";
import {router} from "next/client";
import {useUserStore,useBearStore,useCounterStore} from '../../store/zustand';
import {TypographyH2} from "@/components/ui/typography/typography";
import UserInfo from "@/components/Profile/UserInfo";

export default function ProfilePage({ searchParams }) {
    //const {data:session,status}=useSession()
    /*
    const {data:session,status}=useSession()

    const [posts, setPosts] = useState<Post[]>([])
    const [postsCount, setPostsCount] = useState<number>(0)
    const [pagesCount, setPagesCount] = useState<number>(0)
    const [postsPerPage, setPostsPerPage] = useState<number>(2)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const router=useRouter();

    console.log("session",session);

    const name = useUserStore((state) => state.name);
    const id = useUserStore((state) => state.id);

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (session) {
            useUserStore.setState({id:session.user.id})
            useUserStore.setState({name:session.user.name})
        }
        getData(currentPage);
    }, []);


    if (status === "loading") return <p>Loading...</p>;

    async function getData(page:number){
        console.log("id inside get data",id)
        const res=await fetch(`/api/posts?page=${page}&take=${postsPerPage}&userId=${id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            },
        })
        if(res.ok){
            const { posts, count } = await res.json();
            console.log("posts, count ",posts, count )
            setPosts(posts);
            setPostsCount(count);
            setPagesCount(Math.ceil(count / postsPerPage));
        }

    }

    const handlePageChange = (page: number) => {
        console.log("current page",currentPage)
        setCurrentPage(page);
        getData(page);
        console.log("new page",page)

    };*/


    return (
        <div className="flex flex-col h-auto w-full items-center p-5">
            <UserInfo/>

            {/*
            <h1>Hello {name}</h1>
            <h1>my id {id}</h1>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
                My posts
            </h2>
            <div className="min-w-full flex flex-col gap-5 items-center ">
                {posts?.map((post)=>(
                    <Card key={post.slug} className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

                        <CardHeader className="p-4">
                            <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="px-4 py-2 text-sm flex-col items-start">
                            <Button onClick={()=>{
                                router.push(`/posts/${post.slug}`);
                            }}>read</Button>
                            <p className="mt-2">{post.createdAt.split("T")[0]}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} tabIndex={currentPage <= 1 ? -1 : undefined}
                                            className={
                                                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                                            }/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} tabIndex={currentPage <= 1 ? -1 : undefined}
                                        className={
                                            currentPage >= pagesCount ? "pointer-events-none opacity-50" : undefined
                                        }/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>*/}


        </div>
    );
}