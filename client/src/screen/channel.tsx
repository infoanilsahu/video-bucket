import { VideoCart } from "@/components/common/videoCard";
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

interface ChannelProp {
    username: string;
    id: string;
    channelName: string;
    banner: string | null;
    profilePicture: string ;
    subscriberCount: number;
}

interface UploadsProp {
    id: string;
    userId: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
    createdAt: string;
}

export function Channel() {

    const { username } = useParams()

    const [channel, setChannel] = useState<ChannelProp | null>(null)
    const [uploads, setUploads] = useState<UploadsProp[]>([])

    async function loadData() {
        try {
            
            const res = await api.get("/api/channel/"+username)

            if( res.status ) {
                const { chanel, uploads } = res.data

                console.log(res);
                

                setChannel(chanel)
                setUploads(uploads)
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    },[username])
    

    return (
        <>
        {channel&& (<div>
            <div className="channel">
                <div className="banner">
                    {channel.banner && <img src={channel.banner} alt="" />}
                </div>
                <div className="flex">
                    <div className="profile-picture">
                        {channel.profilePicture && <img src={channel.profilePicture} alt="" />}
                    </div>
                    <div className="">
                        <div>{channel.channelName}</div>
                        <div>{channel.username}</div>
                    </div>
                </div>
            </div>
        
            {uploads && 
                <div className="uploads">
                    {uploads && uploads.map((video) => <VideoCart 
                        id={video.id}
                        title={video.title}
                        description={video.description}
                        thumbnailUrl={video.thumbnailUrl}
                        createdAt={video.createdAt}
                        userChannelName={channel.channelName}
                        userid={channel.id}
                        username={channel.username}
                        userProfilePicture={channel.profilePicture}
                    />) }
                </div>
            }
        </div>)}
        </>
    )
}

