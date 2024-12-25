export default async function fetchPosts(page: string,postsPerPage:string){

    const res=await fetch(process.env.URL +`/api/posts?page=${page}&take=${postsPerPage}`,{
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