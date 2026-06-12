import express from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../prisma/db';
import { videoUploadSchema } from "../validation/zodSchemas";

const router = express.Router();

// Upload video
router.post('/upload', async (req, res) => {
  const { token } = req.cookies

  if ( !token ) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    const userId = decoded.id;

    const parser = videoUploadSchema.safeParse(req.body)
    if ( !parser.success ) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    const { title, description, thumbnailUrl, videoUrl } = parser.data

    const upload = await prisma.uploads.create({
      data: {
        userId,
        title, 
        description,
        videoUrl,
        thumbnailUrl
      }
    });

    return res.status(200).json({ id: upload.id });

  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
});

// get video
router.get("/", async (req, res) => {
  try {

    const videos = await prisma.uploads.findMany({
      include: {user: {select: {id: true, channelName: true, profilePicture: true}}},
      orderBy: {createdAt: "desc"}
    })

    return res.status(200).json({
      videos
    })
    
  } catch (err) {
    return res.status(500).json({ message: "server error" })
  }
})

// get spacific video
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
  
    const video = await prisma.uploads.findUnique({
      where: {id: id},
      include: {user: {select: {id: true, channelName: true, profilePicture: true, subscriberCount: true}}}
    })

    if( !video ) return res.status(404).json({ message: "video not found"})

    return res.status(200).json({
      video
    })
    
  } catch (error) {
    return res.status(500).json({ message: "server error" })
  }
});

export default router;