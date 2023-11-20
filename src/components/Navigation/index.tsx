"use client"

import {
  Flex,
  Box,
  Text,
  Separator,
  DropdownMenu,
  Button,
} from "@radix-ui/themes"
import {
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
import PreNav from "./PreNav"
import SearchBar from "./SearchBar"

function Navigation() {
  const { status, data } = useSession()

  const { cartItems } = useCartStore()

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
            <Box className='w-[40%]'>
              <SearchBar />
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
