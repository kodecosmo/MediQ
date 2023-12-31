
import React from 'react';
import Link from 'next/link';


function Navlanding() {
    return (
        <nav className="bg-background border-b py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="">
                        <Link href="/home">
                            <div className="font-bold text-xl text-primary">{process.env.NEXT_PUBLIC_APP_NAME}</div>
                        </Link>
                    </div>

                    <div className="flex items-baseline space-x-4">
                        <Link href="https://www.ko-de.org/" target='_blank'>
                            <div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium">About</div>
                        </Link>
                        <Link href="/services">
                            <div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium">Services</div>
                        </Link>
                        <Link href="/contact">
                            <div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium">Contact</div>
                        </Link>
                    </div>
                    <div className=''>
                        <Link href="/login">
                            <div className="text-primary hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium">Login</div>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navlanding;
