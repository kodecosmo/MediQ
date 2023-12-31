import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const Navbar = ({ width }) => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const redirectPath = process.env.NEXT_PUBLIC_UNAUTH_REDIRECT_URL;

  const handleLogout = () => {
    setIsPending(true);
    localStorage.removeItem("token");
    router.push(redirectPath);
  };

  return (
    <section
      className={` max-w-7xl mx-auto px-4 py-3 flex items-center justify-between font-semibold`}
      style={{ height: `${width}px` }}
    >
      <div className="text-xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </div>
      <div className="flex items-center">
        {!isPending && (
          <button
            onClick={handleLogout}
            className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        )}
        {isPending && (
          <button
            disabled
            type="submit"
            className="w-full bg-gray-500 text-white p-2 rounded flex items-center justify-center"
          >
            <Spinner width="w-4" height="h-4" />
            <span className="ml-2">Logout</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
