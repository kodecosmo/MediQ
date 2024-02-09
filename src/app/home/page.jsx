"use client";

import React from "react";
import Navlanding from "@/components/navLanding";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <>
      <Navlanding />
      <div className="bg-background text-text">
        {/* Hero Section */}
        <section className="flex items-center max-w-7xl m-auto justify-start h-screen px-8 pb-4 gap-10">
          <div className="w-2/3 mt-28 flex-col">
            <div className="w-full flex flex-col justify-center items-start">
              <h1 className="text-5xl font-bold  text-primary mb-4">
                Be Prepaired <br /> Anytime Anywhere
              </h1>
              <p className="text-xl mb-6">
                With Your AI-powered First-aid Assistant That is in your pocket
                whereever you go so that you can be a helping hand whenever the
                times call for it. Go and be a hero
              </p>
            </div>

            <div className="flex w-full justify-start items-center gap-5">
              <button className="bg-primary text-white py-3 px-5 rounded-lg hover:bg-accent transition">
                <Link href="/login">Try MedIQ</Link>
              </button>
              <button className="border-2 border-primary px-4 py-2 rounded-lg">
                <Link href="/login">Watch Intro Video</Link>
              </button>
            </div>
          </div>

          <div className="w-1/3 mt-28 flex justify-end items-center h-full mx-auto">
            <Spline scene="https://prod.spline.design/MOfJtci1RXwfyvf3/scene.splinecode" />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-28 h-screen max-w-7xl mx-auto"></section>

        {/* Our Team Section */}
        <section className="mt-28 h-screen">
          <div className="max-w-4xl mx-auto px-4 pb-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group px-6">
              {/* Feature 1 */}
              <div className="p-6 border border-secondary rounded-lg group-hover:scale-[1] group-hover:hover:scale-105 transition duration-200 ease-in-out">
                <h3 className="text-2xl font-semibold mb-3">
                  Real-Time Guidance
                </h3>
                <p>
                  Step-by-step first aid instructions tailored to specific
                  emergencies.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 border border-secondary rounded-lg group-hover:scale-[1] group-hover:hover:scale-105 transition duration-200 ease-in-out">
                <h3 className="text-2xl font-semibold mb-3">
                  Symptom Analysis
                </h3>
                <p>
                  Advanced AI to analyze symptoms and suggest immediate actions.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 border border-secondary rounded-lg group-hover:scale-[1] group-hover:hover:scale-105 transition duration-200 ease-in-out">
                <h3 className="text-2xl font-semibold mb-3">
                  Natural Language processing
                </h3>
                <p>
                  Advanced AI to analyze symptoms and suggest immediate actions.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 border border-secondary rounded-lg group-hover:scale-[1] group-hover:hover:scale-105 transition duration-200 ease-in-out">
                <h3 className="text-2xl font-semibold mb-3">Visual Analysis</h3>
                <p>
                  Advanced AI to analyze images using gemni pro vision and
                  suggest immediate actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-indigo-700 text-white py-6">
          <div className="text-center">
            <p>kode &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
