import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const formData = await req.formData();
  if (formData.has("file")) {
    const file = formData.get("file");

    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const randomId = uniqid();
    const ext = file.name.split(".").pop();
    const newFileName = randomId + "." + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: newFileName,
        Body: Buffer.concat(chunks),
        ACL: "public-read",
        ContentType: file.type,
      })
    );

    const link = "https://" + process.env.BUCKET_NAME + ".s3.amazonaws.com/" + newFileName;

    return Response.json(link);
  }
}
