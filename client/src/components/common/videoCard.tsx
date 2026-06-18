import { useNavigate } from "react-router";

export function VideoCart( {thumbnailUrl, userProfilePicture, title, userChannelName,id, username}:VideoCartProp ) {

    const router = useNavigate()


    return <div className=" m-1 cursor-pointer overflow-hidden"  >
        <div className=" rounded-2xl overflow-hidden  w-100 h-56 " onClick={() => router(`/watch?vid=${id}`)}>
            <img src={thumbnailUrl} alt="thumbnail" />
        </div>
        <div className="content flex gap-5 mt-1">
            <img onClick={() => router(`/channel/${username}`)} src={userProfilePicture} alt="" className="w-10 h-10 rounded-[50%] " />
            <div className="data" onClick={() => router(`/watch?vid=${id}`)}>
                <div className="title">{title}</div>
                <div className="channel-name">{userChannelName}</div>
            </div>

        </div>

    </div>
}

interface VideoCartProp {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    createdAt: string,
    userid: string,
    username: string;
    userChannelName: string,
    userProfilePicture?: string
}