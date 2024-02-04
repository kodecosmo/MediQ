import { useState } from "react";

const useFetch = (url, method, body = null) => {
  const [response, setResponse] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleDispatch = async () => {
    setIsPending(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(url, requestOptions);
      if (!res.ok) {
        throw new Error("Could not fetch the response from the resource");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { response, isPending, error, handleDispatch };
};

export default useFetch;
