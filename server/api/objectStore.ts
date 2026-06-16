import { Router, type Request, type Response } from "express";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Url = process.env.R2_URL!
const r2AccessKey = process.env.R2_ACCESS_KEY!
const r2Secret = process.env.R2_SECRET_ACCESS_KEY!

const S3 = new S3Client({
  region: "auto", // Required by SDK but not used by R2
  // Provide your Cloudflare account ID
  endpoint: r2Url,
  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  credentials: {
    accessKeyId: r2AccessKey,
    secretAccessKey: r2Secret,
  },
});

const router = Router()


// video
router.post("/video", async (req:Request, res: Response) => {

    const { token } = req.cookies

    if ( !token ) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {

        const videoPath = "videos/" + Math.random() + ".mp4";
        
        const putUrl = await getSignedUrl(
        S3,
        new PutObjectCommand({
            Bucket: "video-bucket",
            Key: videoPath,
            ContentType: "video/mp4",
        }),
        { expiresIn: 3600 },
        );

        return res.status(200).json({
            putUrl,
            finalVideoUrl: "https://pub-dc180c67958a40efa76bafcb1a11c4e6.r2.dev/"+videoPath
        })


    } catch (error: any) {
        return res.status(500).json({
            message: "server error"
        })
    }
})


// image
router.post("/image", async (req:Request, res: Response) => {

    const { token } = req.cookies

    if ( !token ) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {

        const imagePath = "images/" + Math.random() + ".png";
        
        const putUrl = await getSignedUrl(
        S3,
        new PutObjectCommand({
            Bucket: "video-bucket",
            Key: imagePath,
            ContentType: "image/png",
        }),
        { expiresIn: 3600 },
        );

        return res.status(200).json({
            putUrl,
            finalImageUrl: "https://pub-dc180c67958a40efa76bafcb1a11c4e6.r2.dev/"+imagePath
        })


    } catch (error: any) {
        return res.status(500).json({
            message: "server error"
        })
    }
})

export default router;