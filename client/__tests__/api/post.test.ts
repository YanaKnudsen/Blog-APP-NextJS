import { prisma } from "@/utils/db"; // Mocked prisma client
import { POST as createPost } from "@/app/api/post/create";
import { TextDecoder, TextEncoder } from 'util';
import fetch from 'node-fetch';
import slugify from "slugify";


const URL="http://localhost:3002"
let draftId:string;
let slug:string;
const mockDraft=
    {
        id: "mockpostid",
        user:{
            id: "cm5jetsz10000oiqbuzfnsbh3",
            name:"Mock User",
            email:"mock@user.com",
            password:"$2b$10$yf0Jzi4DOcTQj1gwHu0ZJ.HrOvnYVfRgE0wPn9ya/jO1laTUAiP8W",
            createdAt: "2024-12-22T22:07:02.686Z",
            updatedAt: "2024-12-22T22:07:02.686Z"
        },
        userId: "cm5jetsz10000oiqbuzfnsbh3",
        title:"Mock Draft 1",
        description:"Here is my mock post 1. For more information please visit qnudsen.blog.com",
        published:false,
    }

const mockPost=
    {
        id: "mockpostid",
        user:{
            id: "cm5jetsz10000oiqbuzfnsbh3",
            name:"Mock User",
            email:"mock@user.com",
            password:"$2b$10$yf0Jzi4DOcTQj1gwHu0ZJ.HrOvnYVfRgE0wPn9ya/jO1laTUAiP8W",
            createdAt: "2024-12-22T22:07:02.686Z",
            updatedAt: "2024-12-22T22:07:02.686Z"
        },
        userId: "cm5jetsz10000oiqbuzfnsbh3",
        title:"Mock post 1",
        description:"Here is my mock post 1. For more information please visit qnudsen.blog.com",
        published:true,
    }

describe("API Post Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("creates a new draft", async () => {
        const response = await fetch(URL+"/api/post/create", {
            body:JSON.stringify({
                title:mockDraft.title,
                description:mockDraft.description,
                slug:slugify(mockDraft.title),
                published: mockDraft.published,
                userId:mockDraft.userId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const json = await response.json();

        expect(response.status).toBe(200)
        expect(json).toMatchObject({
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            title: 'Mock Draft 1',
            slug:'Mock-Draft-1',
            published:false,
            views:0,
        });
        draftId = json.id;

    });

    it("updates and publishes draft", async () => {
        const isDraft=false;
        const response=await fetch(URL+"/api/post/edit",{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:mockPost.title,
                description:mockPost.description,
                slug:slugify(mockPost.title),
                published: !isDraft,
                userId:mockPost.userId,
                postId:draftId,
            })
        })
        const json = await response.json();

        expect(response.status).toBe(200)
        expect(json).toMatchObject({
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            title: 'Mock post 1',
            slug:'Mock-post-1',
            published:true,
            views:0,
        });

        slug = json.slug;
    });

    it("deletes the post", async () => {
        const response=await fetch(URL+"/api/post/delete",{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                slug:slug,
                userId:mockPost.userId,
            })
        })
        const json = await response.json();

        expect(response.status).toBe(200)
        expect(json).toMatchObject({
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            title: 'Mock post 1',
            slug:'Mock-post-1',
            published:true,
        });
    });

    it("doesn't find previously deleted post in the database", async () => {
        const response = await fetch(URL+`/api/post/${slug}`, {});

        const json = await response.json();

        expect(response.status).toBe(500)
        expect(json).toMatchObject({
            message: "Unexpected error",
        });
    });



   /* it("creates a new post", async () => {
        const response = await fetch(URL+"/api/post/create", {
            body:JSON.stringify({
                title:mockPost.title,
                description:mockPost.description,
                slug:slugify(mockPost.title),
                published: mockPost.published,
                userId:mockPost.userId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const json = await response.json();

        expect(response.status).toBe(200)
        expect(json).toMatchObject({
            id: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            title: 'My mock post 1',
            slug:'My-mock-post-1'
        });
        //expect(json.createdAt).toBeDefined();
        //expect(json.updatedAt).toBeDefined();
       // expect(json.slug).toBe('My-mock-post-1');

      //  expect(json).toEqual({ id: expect.anything(), title: 'My mock post 1' });

    });

    it("fails to create a post with an existing slug", async () => {

        const response = await fetch(URL+"/api/post/create", {
            body: JSON.stringify({
                title: mockPost.title,
                description: mockPost.description,
                slug: slugify(mockPost.title),
                published: mockPost.published,
                userId: mockPost.userId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toMatchObject({
            message: "Unable to save the post. Blog post with the same title already exists",
        });
    });*/

});