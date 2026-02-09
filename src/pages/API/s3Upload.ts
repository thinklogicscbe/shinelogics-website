// src/api/s3Upload.ts

export const uploadFileToS3 = async (file: File): Promise<string> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not configured");

    
  }

  // 1️⃣ Ask backend for signed URL
  const res = await fetch(
    `${backendUrl}/s3/presigned-url?fileName=${encodeURIComponent(
      file.name
    )}&fileType=${encodeURIComponent(file.type)}`
  );

  if (!res.ok) {
    throw new Error("Failed to get upload permission");
  }

  const { uploadUrl, fileUrl } = await res.json();

  // 2️⃣ Upload file directly to S3
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload to S3 failed");
  }

  // 3️⃣ Return public S3 URL
  return fileUrl;
};
