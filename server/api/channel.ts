import { Router, type Request, type Response } from "express";
import prisma from "../prisma/db";

const router = Router()

router.get("/:username", async (req:Request, res:Response) => {
    try {

        const user = req.params.username as string
        
        const chanel = await prisma.user.findFirst({
            where: { username: user },
            select: {id: true, username: true, profilePicture: true, channelName: true, subscriberCount: true, banner: true}
        })

        if( !chanel ) {
            return res.status(404).json({
                message: "invalid username"
            })
        }

        const uploads = await prisma.uploads.findMany({
            where: {userId: chanel.id}
        })
        

        return res.status(200).json({
            chanel, uploads
        })



    } catch (error: any) {
        return res.status(500).json({
            message: "server error"
        })
    }
})


export default router;