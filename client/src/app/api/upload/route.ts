
import { NextRequest, NextResponse } from "next/server";
{/*
import {
    S3Client,
    ListObjectsCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.BUCKET_NAME;
const client = new S3Client({ region: process.env.AWS_REGION });*/}



export const POST = async (req, res) => {
    const formData = await req.formData();

    const file = formData.get("file");
    console.log("file",file)
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    //filename should be post id
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/postImgs" + filename),
            buffer
        );
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};
