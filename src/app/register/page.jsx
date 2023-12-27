"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

function Register() {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isPending, setIsPending] = useState(false);

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
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);

                localStorage.setItem('token', response.data.user.token);
                console.error('Token:', response.data.user.token);
                setIsPending(false);
                return;
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

            setIsPending(false);
            // router.push('/');
            // Handle success, e.g., redirect to a new page
        } catch (error) {
            console.error('Unexpected error:', error);
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
                
            </form>
        </main>
    );
    
}

export default Register