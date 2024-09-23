'use client'
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from "next/navigation";




export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();



  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);
  

  return (
    <>
      <div className="">
        <div className="relative rounded-full">
          <div className="relative">
            <input
              id="projectSearch"
              name="projectSearch"
              type="text"
              placeholder={placeholder}
              className="border rounded-full custom-box-shadow input-border text-black placeholder-gray-500 border-gray-200 pb-2 px-14 pt-2 outline-none w-[300px] active:bg-none"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}              
              defaultValue={searchParams.get('query')?.toString()}
            />
            <SearchIcon className="absolute left-6 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black cursor-pointer" width={50} />
          </div>
        </div>
      </div>
    </>
  )
}