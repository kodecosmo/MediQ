// Filter and redirect routes with token to `/login`

import { useState } from "react";
import { useRouter } from 'next/navigation';

const useHasToken = (url) => {

    const router = useRouter();

    const redirectPath = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleDispatch = () => {
        
        setIsPending(true);

        try {

            const token = localStorage.getItem('token');
            
            const res = fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Coud not fetch the data from the resource');
                }
                return res.json();
            })
            .then(res => {

                if (!res.success) {
                    setError(res.message);
                    setIsPending(false);
                    return;
                }

                setError(null);
                setIsPending(false);
                router.push(redirectPath);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            });

        } catch (error) {
            setError(error);
            setIsPending(false);
        }
    }

    return { isPending, error, handleDispatch };
}

export default useHasToken;