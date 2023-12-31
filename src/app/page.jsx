"use client";

import Navbar from '@/components/Navbar';
import useFetch from '@/hooks/useFetch';
import useHasntToken from '@/hooks/useHasntToken';
import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import useSearch from '@/hooks/useSearch';
import Spinner from '@/components/Spinner';
import Error from '@/components/Error';
import filterFirstName from '@/helpers/filterFirstName';

function Home() {

  const {isPending:isTokenValidating, error:errorToken, handleDispatch:handleDispatch} = useHasntToken('/api/validate-token');

  useEffect(() => handleDispatch(), []);

  const { data: data, isPending, error } = useFetch('api/messages', 'GET');
  
  const [messages, setMessages] = useState([]);

  const scrollContainerRef = useRef(null);

  const [search, setSearch] = useState(null);

  const inputSearchRef = useRef();

  const { data: searchResult, isPending:isPendingSearch, error:errorSearch, handleDispatch:handleDispatchSearch } = useSearch({ request: search }, '/api/messages', 'POST');

  const [user, setUser] = useState({
    name: null,
    email: null,
  });

  const headerWidth = "60"; // px

  const searchWidth = "60"; // px

  const outputWidth = new Number(headerWidth) + new Number(searchWidth); // px

  useEffect(() => {
    setMessages(data.messages || []);

    try {
        
      if (Object.keys(data).length > 0) {

        setUser({
          name: filterFirstName(data.user.name),
          email: data.user.email,
        });
      }
        
    } catch (error) {
      
        setUser({
          name: null,
          email: null,
        })
    }

  }, [isPending]);

  const messagesList = messages.map(message => {

    return (
      <div key={message._id} className='mb-6'>

        <div className='w-fit px-3 py-2 bg-gray-100 mb-2'>
          <div className='font-semibold text-sm mb-1'>{user.name}</div>
          <div className='font-medium text-xs'>{message.request}</div>
        </div>

        <div className='w-fit px-3 py-2 bg-orange-100 mb-2'>
          <div className='font-semibold text-sm mb-1'>Medi<span className='text-blue-500'>Q</span></div>

          {message.response ?
            <div className='font-medium text-xs'>
              {JSON.parse(message.response).map((line, index) => {
                return (<p className='default-styles' key={index} dangerouslySetInnerHTML={{ __html: marked.parse(DOMPurify.sanitize(line.text)) }} />)
              })}
          </div> : <Error styleclass="flex items-center my-2 text-sm text-red-800" message={`Please try again.`} /> }
        </div>

      </div>
    )

  }); 

  useEffect(() => {
    // Scroll to the bottom when the component mounts (page load)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  useEffect(() => {

    if (Object.keys(searchResult).length > 0) {
      setMessages([...messages, searchResult.response]);
      setSearch(null);
      inputSearchRef.current.value = '';
    }
    
  }, [searchResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDispatchSearch();
  }

  return (
    <main className="h-dvh">
      
      <Navbar width={headerWidth} />

      <section ref={scrollContainerRef} className={`w-full p-3 overflow-y-auto overflow-x-hidden`} style={{ height: `calc(100% - ${outputWidth}px)` }}>
        {isPending && <div className='w-full flex justify-center items-center mt-3'>
          <div className='w-fit flex justify-center items-center rounded-md bg-gray-50 p-3'>
            <Spinner width="w-4" height="h-4" />
            <span className="w-fit block ml-2">Loading</span>
          </div>
        </div>}
        {messagesList}
      </section>

      <section className={`max-w-7xl mx-auto px-3 py-2 border-t border-gray-100`} style={{ height: `${searchWidth}px` }}>
        <form onSubmit={handleSubmit} className='flex justify-between items-center h-full w-full'>
          <input disabled={isPendingSearch} type='text' ref={inputSearchRef} onChange={(e) => setSearch(e.target.value) } placeholder='Type your problem here...' className='w-full px-3 py-2 border rounded-md'/>
          {!isPendingSearch && <button type='submit' className='w-fit ml-2 px-3 py-2 border border-gray-100 bg-blue-500 rounded-md text-white'>Search</button>}
          {isPendingSearch && <button disabled type='submit' className='w-fit flex justify-center items-center ml-2 px-3 py-2 border border-gray-100 bg-gray-900 text-white'>
              <Spinner width="w-4" height="h-4" />
              <span className="w-fit block ml-2">Loading</span>
          </button>}
        </form>
      </section>

    </main>
  )
}

export default Home