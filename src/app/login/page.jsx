"use client";

import { useEffect, useState } from "react";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import useAuthenticate from "@/hooks/useAuthenticate";
import useHasToken from "@/hooks/useHasToken";

function Login() {

    const {isPending:isTokenValidating, error:errorToken, handleDispatch:handleTockenCheckDispatch} = useHasToken('/api/validate-token');
    
    useEffect(() => handleTockenCheckDispatch(), []);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { isPending:isPending, error:error, handleDispatch:handleDispatch } = useAuthenticate({ email, password }, '/api/login', 'POST');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDispatch();
    }

    return (
        <main className="w-full">
            <form className="block p-6 mx-auto mt-6 w-full max-w-screen-sm" onSubmit={handleSubmit}>
                
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="someone@company.com" className="block p-2 border mb-2 w-full" required />

                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block p-2 border mb-2 w-full" required />

                {!isPending && <button type="submit" className="block p-2 bg-gray-900 text-white w-full">Login</button>}
                {isPending && <button disabled className="p-2 bg-gray-900 text-white w-full flex justify-center items-center">
                    <Spinner width="w-4" height="h-4" />
                    <span className="w-fit block ml-2">Loading</span>
                </button>}
                {error && <Error message={error} />}
            </form>
        </main>
    );
    
}

export default Login