import { useState } from "react";
import { useRouter } from "next/navigation";

const useHasntToken = (url) => {
  const router = useRouter();
  const redirectPath = process.env.NEXT_PUBLIC_UNAUTH_REDIRECT_URL;
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleDispatch = async () => {
    setIsPending(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Could not fetch the data from the resource");
      }

      const responseData = await res.json();

      if (!responseData.success) {
        setError(responseData.message);
        router.push(redirectPath);
        return;
      }

      setError(null);
    } catch (err) {
      setError(err.message);
      router.push(redirectPath);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, handleDispatch };
};

export default useHasntToken;
