import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: "5b585dddce61905c4225d0874407801b",
  secretAccessKey:
    "9eb0d63582187cd982a57bd254d8a086ac09d36528db7b3e7219b9ca89361dfc",
  endpoint: "https://43208240a6056562027b8c4e28087496.r2.cloudflarestorage.com",
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: "astrolis",
      Key: fileName,
    })
    .promise();
  console.log(response);
};
