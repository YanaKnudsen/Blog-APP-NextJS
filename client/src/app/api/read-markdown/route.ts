import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import {NextResponse} from "next/server";

export async function GET(req: Request,res:Response) {
    const filePath = path.join(process.cwd(), "/src/markdowns/", "post1.md");

    try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        console.log(fileContent);
        return new NextResponse(JSON.stringify(fileContent,{status:200}));
    } catch (error) {
        console.error("Error reading markdown file:", error);
       // res.status(500).json({ message: "Error reading markdown file" });
    }
}