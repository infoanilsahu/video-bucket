"use client"

import { VideoCart } from "@/components/common/videoCard";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export function Home() {

    const [videos, setVideos] = useState<HomeVideo[]>([])

    useEffect(() => {
        api.get("http://localhost:3000/api/video")
        .then( (res) => {
            if ( res.status == 200 ) {

                const { videos } = res.data
                
                setVideos(videos)
            }
            
        })
    }, [])

    return (
        <div className="">
            {videos && videos.map((video) => <VideoCart
                id={video.id}
                title={video.title}
                description={video.description}
                createdAt={video.createdAt}
                thumbnailUrl={video.thumbnailUrl}
                userid={video.user.id}
                userChannelName={video.user.channelName}
                userProfilePicture={video.user.profilePicture}
                username={video.user.username}
            />)}
        </div>
    )
}

interface HomeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    createdAt: string
    user: {
        id: string,
        channelName: string,
        profilePicture: string
        username: string;
    }
}
