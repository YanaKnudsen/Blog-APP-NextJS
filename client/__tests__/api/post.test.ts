import { prisma } from "@/utils/db"; // Mocked prisma client
import { POST as createPost } from "@/app/api/post/create";
import { TextDecoder, TextEncoder } from 'util';
import fetch from 'node-fetch';
import slugify from "slugify";


const URL="http://localhost:3002"
const mockPost=
    {
        id: "mockpostid",
        slug: "Mock-Post-1",
        user:{
            id: "cm5jetsz10000oiqbuzfnsbh3",
            name:"Mock User",
            email:"mock@user.com",
            password:"$2b$10$yf0Jzi4DOcTQj1gwHu0ZJ.HrOvnYVfRgE0wPn9ya/jO1laTUAiP8W",
            createdAt: "2024-12-22T22:07:02.686Z",
            updatedAt: "2024-12-22T22:07:02.686Z"
        },
        userId: "cm5jetsz10000oiqbuzfnsbh3",
        title:"My mock post 1",
        views:3,
        description:"Here is my mock post 1. For more information please visit qnudsen.blog.com",
        published:true,
    }

describe("API Post Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("creates a new post", async () => {
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
});