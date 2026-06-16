import { api } from "@/lib/api"
import axios from "axios"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router"

export function Upload() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    const [completeLoad, setCompleteLoad] = useState(false)

    const router = useNavigate()

    useEffect(() => {
        if( videoUrl.length > 0 && thumbnailUrl.length > 0 && title.length > 3 ) {
            setCompleteLoad(true)
        }

    }, [videoUrl, thumbnailUrl])

    async function submit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if( title.length <= 3 ) return;

        try {

            const res = await api.post("/api/video/upload", {
                title, description, videoUrl, thumbnailUrl
            })

            if( res.status === 200 ) {
                router("/")
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <div className=" m-4 ">
            <form action="" onSubmit={submit}>
                <input 
                    type="text" 
                    value={title} 
                    placeholder="Title" 
                    onChange={(e) => setTitle(e.currentTarget.value)}  
                />
                <input 
                    type="text" 
                    value={description} 
                    placeholder="Description" 
                    onChange={(e) => setDescription(e.currentTarget.value)}  
                />
                <input 
                    type="file"
                    onChange={async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                        const file = e.target.files?.[0]
                        
                        
                        const res = await api.post("/api/getpresignurl/image")
                        if ( res.status === 200 ) {
                            const { putUrl, finalImageUrl } = res.data

                            const responce = await axios({
                                method: "PUT",
                                url: putUrl,
                                headers: {"Content-Type": file?.type},
                                data: file
                            })

                            if( responce.status === 200 ) {
                                setThumbnailUrl(finalImageUrl)
                            }
                        }
                        

                    }}
                />
                <input 
                    type="file"
                    onChange={async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                        const file = e.target.files?.[0]
                        
                        
                        const res = await api.post("/api/getpresignurl/video")
                        if ( res.status === 200 ) {
                            const { putUrl, finalVideoUrl } = res.data

                            const responce = await axios({
                                method: "PUT",
                                url: putUrl,
                                headers: {"Content-Type": file?.type, "Content-Length": file?.size},
                                data: file
                            })

                            if( responce.status === 200 ) {
                                setVideoUrl(finalVideoUrl)
                            }
                        }
                        

                    }}
                />
                <button disabled={!completeLoad} type="submit" className="px-3 bg-black rounded-md text-white disabled:bg-[#515151] disabled:cursor-not-allowed ">Upload Video</button>
            </form>
        </div>
        </>
    )
}