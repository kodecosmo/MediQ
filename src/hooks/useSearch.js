import { useState } from "react";
import { useRouter } from 'next/navigation';

const useSearch = (searchData, url, method) => { 

    const [data, setData] = useState({});

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleDispatch = () => {
        
        setIsPending(true);

        try {
                
            const token = localStorage.getItem('token');
            
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(searchData),
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

        } catch (error) {
            setError(error);
            setIsPending(false);
        }
    }

    return { data, isPending, error, handleDispatch };
}

export default useSearch;