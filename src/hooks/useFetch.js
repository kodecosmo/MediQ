import { useEffect, useState } from "react";

const useFetch = (url, method) => {
    
    const [data, setData] = useState([]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        
        fetch(url, {
                method: method,
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
            .then(data => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            });
    }, []);

    return {data, isPending, error};
}

export default useFetch;