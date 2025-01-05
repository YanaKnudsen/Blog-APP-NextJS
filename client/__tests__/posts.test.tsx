import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import Posts from "../src/components/Blog/Posts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';

const mockPosts=[
    {
        id: "postlc38v000bcsd5846sz5zi",
        slug: "My-Mock-Post-1",
        user:{
            id: "userlc38v000bcsd5846sz5zi",
            name:"Yana Knudsen",
            email:"yana@qnudsen.com",
            password:"$2b$10$yf0Jzi4DOcTQj1gwHu0ZJ.HrOvnYVfRgE0wPn9ya/jO1laTUAiP8W",
            createdAt: "2024-12-22T22:07:02.686Z",
            updatedAt: "2024-12-22T22:07:02.686Z"
        },
        userId: "userlc38v000bcsd5846sz5zi",
        title:"My mock post 1",
        views:3,
        description:"Here is my mock post 1. For more information please visit qnudsen.blog.com",
        published:"true",
        createdAt: "2024-12-22T22:07:02.686Z",
        updatedAt: "2024-12-22T22:07:02.686Z"
    },
    {
        id: "postlc38v000bcsd5846sz5zl",
        slug: "My-Mock-Post-2",
        user:{
            id: "userlc38v000bcsd5846sz5zl",
            name:"Martin Knudsen",
            email:"martin@qnudsen.com",
            password:"$2b$10$yf0Jzi4DOcTQj1gwHu0ZJ.HrOvnYVfRgE0wPn9ya/jO1laTUAiP8W",
            createdAt: "2024-05-22T22:07:02.686Z",
            updatedAt: "2024-05-22T22:07:02.686Z"
        },
        userId: "userlc38v000bcsd5846sz5zl",
        title:"My mock post 2",
        views:0,
        description:"Here is my mock post 2. For more information please visit qnudsen.blog.com",
        published:"true",
        createdAt: "2024-05-22T22:07:02.686Z",
        updatedAt: "2024-05-22T22:07:02.686Z"
    },
]

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/mock-path'),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
    })),
}));

jest.mock("../src/actions/client/fetch-posts", () => jest.fn(() => Promise.resolve({
    posts: mockPosts,
    count: mockPosts.length,
})));


describe("Posts component", () => {
    it("renders main posts heading", () => {
        const queryClient = new QueryClient();
        render
        (<QueryClientProvider client={queryClient}>
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Posts page={2} label={messages.HomePage.title}/>
                </NextIntlClientProvider>
            </QueryClientProvider>
        )
        const heading = screen.getByRole('heading', { name: messages.HomePage.title, level: 2 });
        expect(heading).toBeInTheDocument();
    })

    it("renders all posts on the page", async() => {
        const queryClient = new QueryClient();
        render
        (<QueryClientProvider client={queryClient}>
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Posts page={1} label="Blog Posts" userId="" />
                </NextIntlClientProvider>
            </QueryClientProvider>
        )
        // Verify each post title is rendered
        for (const post of mockPosts) {
            expect(await screen.findByText(post.title)).toBeInTheDocument();
        }

        // Verify post author and date details
      /*  for (const post of mockPosts) {
            expect(await screen.findByText(post.user.name)).toBeInTheDocument();
            expect(await screen.findByText(post.createdAt.split("T")[0])).toBeInTheDocument();

            if (!post.published) {
                expect(await screen.findByText("draft")).toBeInTheDocument();
            }
        }

        // Assert the correct number of CardTitle elements (titles)
        const titleElements = await screen.findAllByText(/Post \d/); // Match titles dynamically
        expect(titleElements).toHaveLength(mockPosts.length);*/


    })
})
