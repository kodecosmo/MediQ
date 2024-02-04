import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import useFetch from "@/hooks/useFetch";

const Navbar = ({ width, handleClearMessages }) => {
  const router = useRouter();

  const {
    response: clearChatData,
    isPending: isClearChatPending,
    error: clearChatError,
    handleDispatch: handleClearChat,
  } = useFetch("api/messages/clear", "DELETE");

  const [isPending, setIsPending] = useState(false);

  const redirectPath = process.env.NEXT_PUBLIC_UNAUTH_REDIRECT_URL;

  const [clearChatRequest, setClearChatRequest] = useState({
    status: false,
    data: [],
    isPending: false,
    error: null,
  });

  const handleLogout = () => {
    setIsPending(true);
    localStorage.removeItem("token");
    router.push(redirectPath);
  };

  useEffect(() => {
    if (isClearChatPending && !clearChatError) {
      handleClearMessages();
    }
  }, [isClearChatPending]);

  return (
    <section
      className={` max-w-7xl mx-auto px-4 py-3 flex items-center justify-between font-semibold`}
      style={{ height: `${width}px` }}
    >
      <div className="text-xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </div>
      <div className="flex items-center">
        {!isClearChatPending && (
          <button
            onClick={handleClearChat}
            className="w-full border-gray-100 bg-blue-500 p-2 rounded transition-colors duration-200 ease-in-out mr-2 text-background flex items-center justify-center"
          >
            Clear
          </button>
        )}
        {isClearChatPending && (
          <button
            onClick={handleClearChat}
            className="w-full border-gray-100 bg-blue-500 p-2 rounded transition-colors duration-200 ease-in-out mr-2 text-background flex items-center justify-center"
          >
            <Spinner width="w-4" height="h-4" />
            <span className="ml-2">Clear</span>
          </button>
        )}
        {!isPending && (
          <button
            onClick={handleLogout}
            className="block w-full bg-primary text-background p-2 rounded hover:bg-secondary hover:text-text transition-colors duration-200 ease-in-out"
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
