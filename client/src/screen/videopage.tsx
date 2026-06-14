import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { api } from "./../lib/api";

export function VideoPage() {
     
    const [searchParams, setSearchParams] = useSearchParams()
    const [video, setVideo] = useState<VideoProp>()
    const [loading, setLoading] = useState(false)

    const id = searchParams.get("vid")

    async function dataLoad() {
        if( !id ) {
            setVideo(undefined)
            return
        }

        try {
            const res = await api.get(`/api/video/${id}`)

            if( res.status === 200 ) {
                const { video } = res.data

                setVideo(video)
            }

        } catch (err: any) {
            console.log(err);
        }
    }
    
    async function sunbscribe() {
        try {
            
        } catch (error: any) {
          console.log(error);
        }
    }

    useEffect(() => {
        dataLoad()
    }, [id])

    return <div className="">
        {video && (
            <>
                <div>
                    <video src={video.videoUrl} controls ></video>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="channel flex gap-17">
                        <div className="flex gap-2">
                            <img src={video.user.profilePicture} alt="" className="rounded-[50%] w-10 "/>
                            <h2>{video.user.channelName}</h2>
                        </div>
                        <button className="cursor-pointer px-4 rounded-md font-bold bg-black text-white" onClick={sunbscribe}>Subscribe</button>
                    </div>
                </div>
            </>
        )}
    </div>
}

interface VideoProp {
    id: string;
    userId: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
    createdAt: string;
    user: {
        id: string;
        channelName: string;
        profilePicture: string;
        subscriberCount: number;
    }
}