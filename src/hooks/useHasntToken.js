// Filter and redirect routes without token to `/`

import { useState } from "react";
import { useRouter } from 'next/navigation';

const useHasntToken = (url) => {

    const router = useRouter();

    const redirectPath = process.env.NEXT_PUBLIC_UNAUTH_REDIRECT_URL;

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
                    'token': token,
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
                    router.push(redirectPath);
                }

                setError(null);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
                router.push(redirectPath);
            });

        } catch (error) {
            setError(error);
            setIsPending(false);
        }
    }

    return { isPending, error, handleDispatch };
}

export default useHasntToken;