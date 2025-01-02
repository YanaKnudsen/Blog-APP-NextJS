import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import Home from "../src/components/test/Home";

describe("Home",()=>{
    it("should have heading",()=>{
        render(<Home/>)
        const heading = screen.getByRole('heading', { name: 'Home' });
        expect(heading).toBeInTheDocument()
    })
})
