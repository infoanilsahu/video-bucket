import { api } from "@/lib/api";
import { useState } from "react"
import { useNavigate } from "react-router";

export function SignIn() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const router = useNavigate()

    async function Submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() 
        
        if( username.length < 3 || password.length < 4 ) return;

        try {
            const res = await api({
                method: "POST",
                url: "/api/auth/login",
                data: {
                    username, password
                }
            })

            if ( res.status === 200 ) {
                console.log(res.data);
                
                router("/")
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
        <form action="" onSubmit={Submit} className="m-2 ">
            <input 
            type="text" 
            value={username} 
            placeholder="User Name" 
            onChange={(e) => setUsername(e.currentTarget.value)} />
            <input 
            type="text" 
            value={password} 
            placeholder="Password" 
            onChange={(e) => setPassword(e.currentTarget.value)} />
            <button type="submit" className="bg-black text-white px-4 font-semibold rounded-md cursor-pointer">Login</button>
        </form>
        </>
    )
}
