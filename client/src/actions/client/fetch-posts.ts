
export default async function fetchPosts(page: number=1,postsPerPage:number=10,userId: string = ""){

    const res=await fetch(`/api/post/list?page=${page}&take=${postsPerPage}&userId=${userId}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        },
    })
    if(res.ok){
        const { posts, count } = await res.json();
        return({ posts, count });
    }

}