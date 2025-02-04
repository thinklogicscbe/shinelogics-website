import AWS from 'aws-sdk';

const S3_BUCKET = 'webscrapingfarm2bag';
const REGION = 'ap-south-1';
const ACCESS_KEY = 'AKIAQSNAUQE5MBTDHWHK';
const SECRET_ACCESS_KEY = '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';

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
});

const s3 = new AWS.S3();

interface FileUpload {
    name: string;
    type: string;
    [key: string]: any;

}

const uploadPdfToS3 = (file: FileUpload): Promise<string> => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: `${file.name}`,
            Body: file, 
            ContentType: 'application/octet-stream',
            // ACL: 'public-read',
        };

        s3.upload(params, (err:any, data:any) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);  
            }
        });
    });
};

export { uploadPdfToS3 };
