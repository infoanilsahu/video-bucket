import { useSearchParams } from "react-router"

export function VideoPage() {
     
    const [searchParams, setSearchParams] = useSearchParams()

    const id = searchParams.get("vid")

    return <div className=" border-2">
        video page + { id }
    </div>
}