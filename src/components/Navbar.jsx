import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const Navbar = ({ width }) => {

    const router = useRouter();

    const [isPending, setIsPending] = useState(false);

    const redirectPath = process.env.NEXT_PUBLIC_UNAUTH_REDIRECT_URL;

    const handleLogout = () => {
        setIsPending(true);
        localStorage.removeItem('token');
        router.push(redirectPath);
    }

    return (
        <section className={`w-full px-3 py-2 flex items-center justify-between border-b border-gray-100 font-semibold`} style={{ height: `${width}px` }}>
            <div>{process.env.NEXT_PUBLIC_APP_NAME}</div>
            {!isPending && <button onClick={handleLogout} className="block px-3 py-2 border border-gray-100 bg-gray-900 text-white w-fit">Logout</button>}
            {isPending && <button disabled type='submit' className='w-fit flex justify-center items-center ml-2 px-3 py-2 border border-gray-100 bg-gray-900 text-white'>
              <Spinner width="w-4" height="h-4" />
              <span className="w-fit block ml-2">Logout</span>
          </button>}
        </section>
    )
}

export default Navbar