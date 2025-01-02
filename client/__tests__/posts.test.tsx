import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import Posts from "../src/components/test/Home";

describe("Posts",()=>{
    it("renders",()=>{
        render(<Posts/>)
    });
})
