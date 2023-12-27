"use client";

import Navbar from '@/components/Navbar';
import useFetch from '@/hooks/useFetch';
import useHasntToken from '@/hooks/useHasntToken';
import { useEffect } from 'react';

function Home() {

  const {isPending:isTokenValidating, error:errorToken, handleDispatch:handleDispatch} = useHasntToken('/api/validate-token');

  useEffect(() => handleDispatch(), []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data: messages, isPending, error } = useFetch(`${apiUrl}/messages`);
  
  const headerWidth = "60"; // px

  const searchWidth = "60"; // px

  const outputWidth = new Number(headerWidth) + new Number(searchWidth); // px

  const messagesList = messages.map(message => {
    return (
      <div key={message.id} className='mb-6'>

        <div className='w-fit px-3 py-2 bg-gray-100 mb-2'>
          <div className='font-semibold text-sm mb-1'>{message.user_id}</div>
          <div className='font-medium text-xs'>{message.request}</div>
        </div>

        <div className='w-fit px-3 py-2 bg-orange-100 mb-2'>
          <div className='font-semibold text-sm mb-1'>MediQ</div>
          <div className='font-medium text-xs'>{message.response}</div>
        </div>

      </div>
    )
  }); 

  return (
    <main className="h-dvh">
      
      <Navbar width={headerWidth} />

      <section className={`w-full p-3`} style={{ height: `calc(100% - ${outputWidth}px)` }}>
        {messagesList}
      </section>

      <section className={`w-full px-3 py-2 border-t border-gray-100`} style={{ height: `${searchWidth}px` }}>
        <form className='flex justify-between items-center h-full w-full'>
          <input type='text' placeholder='Type your problem here...' className='w-full px-3 py-2 border'/>
          <button type='submit' className='w-fit ml-2 px-3 py-2 border border-gray-100 bg-gray-900 text-white'>Search</button>
        </form>
      </section>

    </main>
  )
}

export default Home