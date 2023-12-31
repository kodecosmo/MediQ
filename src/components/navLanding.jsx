"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'react-feather'; // Import the hamburger icon

function Navlanding({}) {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        open: { opacity: 1, y: 140 },
        closed: { opacity: 0, y: "-100%" },
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const appName = process.env.NEXT_PUBLIC_APP_NAME;

    return (
        <nav className="bg-background border-b py-5 md:py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center w-full lg:w-auto">
                        <Link href="/home">
                            <div className="font-bold text-xl text-primary cursor-pointer">{appName}</div>
                        </Link>
                        <div className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden" onClick={toggleMenu}>
                            <Menu />
                        </div>
                    </div>

                    <div className="hidden md:flex items-baseline space-x-4">
                        <Link href="/about"><div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer">About</div></Link>
                        <Link href="/services"><div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer">Services</div></Link>
                        <Link href="/contact"><div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer">Contact</div></Link>
                    </div>

                    <div className="hidden md:flex">
                        <Link href="/login"><div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</div></Link>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="absolute right-0 h-[200px] rounded-lg shadow-sm  mr-6 border w-1/3 bg-background flex flex-col items-center justify-center md:hidden"
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <Link href="/about"><div className="text-accent px-3 py-2 rounded-md text-base font-medium cursor-pointer">About</div></Link>
                                <Link href="/services"><div className="text-accent px-3 py-2 rounded-md text-base font-medium cursor-pointer">Services</div></Link>
                                <Link href="/contact"><div className="text-accent px-3 py-2 rounded-md text-base font-medium cursor-pointer">Contact</div></Link>
                                <Link href="/login"><div className="text-accent px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</div></Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}

export default Navlanding;
