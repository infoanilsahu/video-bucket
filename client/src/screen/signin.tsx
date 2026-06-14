import { api } from "@/lib/api";
import { useState } from "react"

export function SignIn() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    async function Submit() {
        try {
            const res = await api({
                method: "POST",
                url: "/api/auth/login",
                data: {
                    username, password
                }
            })

            if ( res.status === 200 ) {
                
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
        
        </>
    )
}
