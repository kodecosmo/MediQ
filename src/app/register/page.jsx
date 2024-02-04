"use client";

import { useEffect, useState } from "react";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import useAuthenticate from "@/hooks/useAuthenticate";
import useHasToken from "@/hooks/useHasToken";
import Link from "next/link";
import Navlanding from "@/components/navLanding";

function Register() {
  const {
    isPending: isTokenValidating,
    error: errorToken,
    handleDispatch: handleTockenCheckDispatch,
  } = useHasToken("/api/validate-token");

  useEffect(() => handleTockenCheckDispatch(), []);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    isPending: isPending,
    error: error,
    handleDispatch: handleDispatch,
  } = useAuthenticate("/api/register", "POST", { name, email, password });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDispatch();
  };

  return (
    <>
    <Navlanding/>
    <main className="w-full h-screen flex items-center justify-center">
      <div className="bg-background p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form
          className="block p-6 mx-auto mt-6 w-full max-w-screen-sm"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Kenura Gunarathna"
            className="block w-full p-2 border mb-4"
            required
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="someone@company.com"
            className="block w-full p-2 border mb-4"
            required
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full p-2 border mb-4"
            required
          />

          {!isPending && (
            <button
              type="submit"
              className="block w-full bg-primary text-background p-2 mt-4 rounded hover:bg-secondary hover:text-text transition-colors duration-200 ease-in-out"
            >
              Register
            </button>
          )}
          {isPending && (
            <button
              disabled
              className="w-full bg-secondary text-background p-2 rounded flex items-center justify-center"
            >
              <Spinner width="w-4" height="h-4" />
              <span className="w-fit block ml-2">Loading</span>
            </button>
          )}
          <div className="mt-3">Already have an account? <Link href="/login"><span className="text-primary hover:underline transition-colors duration-200 ease-in-out">login</span></Link> </div>
          {error && <Error message={error} />}
        </form>
      </div>
    </main>
    </>
  );
}

export default Register;
