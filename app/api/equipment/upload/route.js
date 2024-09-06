import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You must have valid session token to access this API route." }, {
            status: 401,
        });
    }
    
    const body = await req.json();
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
        return NextResponse.json({ message: 'Missing fileName or fileType' }, { status: 400 });
    }

    const fileKey = `${uuidv4()}-${fileName}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        ContentType: fileType,
    }

    try {
        const command = new PutObjectCommand(params);
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return NextResponse.json({ signedUrl, fileKey }, { status: 200, });
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return NextResponse.json({ message: "Error generating signed URL" }, { status: 500, });
    }  
}