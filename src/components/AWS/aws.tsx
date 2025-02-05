import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accessKey=process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretKey=process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = "webscrapingfarm2bag";
const REGION = "ap-south-1";

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: `${accessKey}`,
    secretAccessKey: `${secretKey}`,
  },
});

interface FileUpload {
  name: string;
  type: string;
  content: Blob; 
}

const uploadPdfToS3 = async (file: FileUpload): Promise<string> => {
  try {
    const arrayBuffer = await file.content.arrayBuffer(); 
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type || "application/pdf",
    };
console.log(params,"params");

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export { uploadPdfToS3 };
