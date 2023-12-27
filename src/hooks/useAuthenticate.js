import { useState } from "react";
import { useRouter } from 'next/navigation';

const useAuthenticate = (data, url) => { 

    const router = useRouter();

    const redirectPath = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleDispatch = () => {
        
        setIsPending(true);

        try {
            const res = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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

                localStorage.setItem('token', res.user.token);
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

export default useAuthenticate;