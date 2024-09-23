import Logo from '@/assets/yaadigo.webp'
import Image from "next/image";
import SearchBar from './SearchBar';
import { Suspense } from "react";

export default function TopNav() {
  return (
    <>
      <header className='w-full'>
        <div className='md:py-3 md:px-20 px-5 py-1 flex justify-between border-b border-b-gray-300 items-center'>
          <Image src={Logo} alt="Yaadigo" width={60} />
          <div className='hidden'>
            <Suspense fallback={<p>Loading...</p>}>
              <SearchBar placeholder='Search for Destination'/>
            </Suspense>
          </div>
          <div className='hidden items-center gap-5 font-[500]'>
            <button className='font-color'>
              <h4 className='font-[500]'>Login</h4>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}