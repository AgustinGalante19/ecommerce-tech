"use client"

import {
  Flex,
  Box,
  Text,
  Container,
  Separator,
  Strong,
  TextField,
  DropdownMenu,
  Button,
} from "@radix-ui/themes"
import {
  MapPin,
  Truck,
  BadgePercent,
  Search,
  User,
  ShoppingCart,
  Store,
  ChevronDown,
  LogOut,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useCartStore } from "@/store/useCartStore"
import { Combobox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PreNav from "./PreNav"
import api from "@/api"
import { useCases } from "@/api/useCases"
import SearchResultType from "@/types/SearchResult"

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function Navigation() {
  const { status, data } = useSession()

  const { cartItems } = useCartStore()

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([])

  const debounceSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const searchProducts = async () => {
      useCases.products
        .search({ searchQuery: debounceSearch })
        .then((response) => {
          setSearchResult(response.data.data)
        })
    }
    if (debounceSearch) searchProducts()
  }, [debounceSearch])

  return (
    <nav className='flex flex-col border-b border-[#EDEDED]'>
      <div className='max-sm:hidden'>
        <PreNav />
      </div>
      <Flex className='bg-white p-3'>
        <Box className='w-[1136px] mx-auto'>
          <Flex align='center' justify='between'>
            <Box>
              <Link href='/'>
                <Flex align='center' gap='2'>
                  <div className='bg-secondary p-2 rounded-md '>
                    <Store color='#008ECC' />
                  </div>
                  <Text
                    size='5'
                    weight='bold'
                    className='text-primary max-sm:hidden'
                  >
                    Ecommerce
                  </Text>
                </Flex>
              </Link>
            </Box>
            {/* <Box className='w-[40%]'>
              <Combobox>
                <Combobox.Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className='w-full bg-secondary py-1 px-2 rounded-md'
                />
                <Combobox.Options className='bg-offwhite border-b border-md p-2 absolute w-[455px]'>
                  {searchResult.map((result) => (
                    <Combobox.Option key={result.productId} value={result}>
                      <Link href={`/search?searchQuery=${searchQuery}`}>
                        {result.name}
                      </Link>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </Box> */}
            <Box className='w-[40%]'>
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
            </Box>
            <Box className='max-sm:block hidden'>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant='soft' className='hover:cursor-pointer'>
                    {data?.user?.name}
                    <ChevronDown />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Link
                      className='hover:cursor-pointer transition-colors flex justify-between w-full'
                      href='/cart'
                    >
                      <span className='text-primary'>Cart</span>
                      <ShoppingCart
                        size={16}
                        color='#008ECC'
                        fill={cartItems.length > 0 ? "#008ECC" : "#fff"}
                      />
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Button
                      variant='ghost'
                      className='hover:text-white hover:cursor-pointer transition-colors'
                      asChild
                    >
                      <Flex align='center' gap='2'>
                        <Link href='/orders' className=' w-full'>
                          <span>Orders</span>
                        </Link>
                        <FileText />
                      </Flex>
                    </Button>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    color={status === "authenticated" ? "red" : "blue"}
                  >
                    {status === "authenticated" ? (
                      <button
                        onClick={() => signOut()}
                        className='flex gap-3 items-center justify-between  w-full'
                      >
                        <span>Logout</span>
                        <LogOut size={16} />
                      </button>
                    ) : (
                      <Link
                        className='hover:cursor-pointer transition-colors flex justify-between w-full gap-2'
                        href='/auth/login'
                      >
                        <span>Login</span>
                        <User size={16} />
                      </Link>
                    )}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>
            <Box className='max-sm:hidden'>
              <div className='flex items-center'>
                <Box>
                  <Flex align='center'>
                    {status === "unauthenticated" ? (
                      <>
                        <User color='#008ECC' />
                        <Link
                          href='/auth/login'
                          className='text-gray-500 ml-1 font-medium'
                        >
                          Login
                        </Link>
                      </>
                    ) : (
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <Button
                            variant='soft'
                            className='hover:cursor-pointer'
                          >
                            {data?.user?.name}
                            <ChevronDown />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                          <DropdownMenu.Item>
                            <Button
                              variant='ghost'
                              className='hover:text-white hover:cursor-pointer transition-colors'
                              asChild
                            >
                              <Flex align='center' gap='2'>
                                <Link href='/orders' className=' w-full'>
                                  <span>Orders</span>
                                </Link>
                                <FileText />
                              </Flex>
                            </Button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item color='red'>
                            <Button
                              variant='ghost'
                              className='hover:text-white hover:cursor-pointer transition-colors'
                              onClick={() => signOut()}
                            >
                              <Flex align='center' gap='2'>
                                Logout
                                <LogOut className='ml-2' size={16} />
                              </Flex>
                            </Button>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    )}
                  </Flex>
                </Box>
                <Separator orientation='vertical' className='mx-4' />
                <Box>
                  <Link
                    href='/cart'
                    className='text-gray-500 ml-1 font-medium flex gap-1 hover:text-black transition-colors'
                  >
                    <ShoppingCart
                      color='#008ECC'
                      fill={cartItems.length > 0 ? "#008ECC" : "#fff"}
                    />
                    Cart
                  </Link>
                </Box>
              </div>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </nav>
  )
}
export default Navigation
