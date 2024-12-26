export default async function fetchPosts(page: number,postsPerPage:number,userId: string = ""){

    const res=await fetch(`http://localhost:3000/api/posts?page=${page}&take=${postsPerPage}&userId=${userId}`,{
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