"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

type S3UploadResponse = {
  statusCode: number;
  fileName: string;
};

const handleUploadS3 = async (imageData : FormData): Promise<S3UploadResponse> => {
  try {
    const image = imageData.get('file') as File;

    if (!image) return { statusCode: 400, fileName: "" };
    const Bucket = process.env.S3_BUCKET;
    const s3 = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
    const ext = image?.name.split(".").at(-1);
    const uid = uuidv4().replace(/-/g, "");
    const fileName = `${uid}${ext ? "." + ext : ""}`;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadToS3 = new PutObjectCommand({
      Bucket: Bucket,
      Key: fileName,
      Body: buffer,
      ContentType: "image/jpeg",
    });

    const result = await s3.send(uploadToS3);
    if (result.$metadata.httpStatusCode)
      return {
        statusCode: result.$metadata.httpStatusCode,
        fileName: fileName,
      };
    else return { statusCode: 500, fileName: fileName };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, fileName: "" };
  }
};

export { handleUploadS3 };
