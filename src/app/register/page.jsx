"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import Error from "@/components/Error";

function Register() {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Coud not fetch the data from the resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            });

            const responseData = await response.json();

            if (!responseData.success) {
                setError(responseData.message);
                setIsPending(false);
                return;
            }

            localStorage.setItem('token', responseData.user.token);
            setError(null);
            setIsPending(false);
            router.push('/');
        } catch (error) {
            setError(error);
            setIsPending(false);
        }
    }

    return (
        <main className="w-full">
            <form className="block p-6 mx-auto mt-6 w-fit" onSubmit={handleSubmit}>
                
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Kenura Gunarathna" className="block p-2 border mb-2" required />

                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="someone@company.com" className="block p-2 border mb-2" required />

                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block p-2 border mb-2" required />

                {!isPending && <button type="submit" className="block p-2 bg-gray-900 text-white w-full">Register</button>}
                {isPending && <button disabled className="block p-2 bg-gray-900 text-white w-full">Creating user...</button>}
                {error && <Error message={error} />}
            </form>
        </main>
    );
    
}

export default Register