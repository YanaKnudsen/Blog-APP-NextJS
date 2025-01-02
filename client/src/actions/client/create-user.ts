

export default async function createUser(name:string, email:string, password:string) {
    const res=await fetch("/api/auth/register",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    })
    return res
};

