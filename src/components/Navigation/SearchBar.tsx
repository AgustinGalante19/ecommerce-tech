import SearchResultType from "@/types/SearchResult"
import { Combobox, Transition } from "@headlessui/react"
import { Fragment } from "react"
import useSearchBar from "./useSearchBar"

function SearchBar() {
  const { searchQuery, searchResult, setSearchQuery } = useSearchBar()
  return (
    <Combobox>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg text-left sm:text-sm'>
          <Combobox.Input
            className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-secondary'
            displayValue={(result: SearchResultType) => result.name}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search for products'
          />
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setSearchQuery("")}
        >
          <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 sm:text-sm'>
            {searchResult.length === 0 && searchQuery !== "" ? (
              <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              searchResult.map((result) => (
                <Combobox.Option
                  key={result.productId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-5 pr-4 ${
                      active
                        ? "bg-primary bg-opacity-75 cursor-pointer text-white"
                        : "text-gray-900"
                    }`
                  }
                  value={result}
                >
                  {result.name}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
export default SearchBar
