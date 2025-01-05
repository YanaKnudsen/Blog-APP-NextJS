

export default async function createAI(userPrompt:string="") {
    const res=await fetch("/api/post/ai",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userPrompt:userPrompt,
        })

    })
    return res
};