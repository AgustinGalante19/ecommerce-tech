"use client"

import {
  Flex,
  Box,
  Text,
  Container,
  Separator,
  Strong,
  TextField,
  IconButton,
} from "@radix-ui/themes"
import {
  MapPin,
  Truck,
  BadgePercent,
  AlignJustify,
  Search,
  User,
  ShoppingCart,
  Store,
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

function Navigation() {
  const { status, data } = useSession()

  const PreNav = () => {
    return (
      <Flex className='bg-offwhite p-2'>
        <Container>
          <Flex justify='between' align='center'>
            <Box>
              <Text size='1' className='text-gray-500'>
                Welcome to my ecommerce webpage
              </Text>
            </Box>
            <Flex>
              <Box className='mx-4'>
                <Flex>
                  <MapPin size={16} className='mr-1' color='#008ECC' />
                  <Text size='1' className='text-gray-500'>
                    Deliver to your <Strong>location</Strong>!
                  </Text>
                </Flex>
              </Box>
              <Separator orientation='vertical' />
              <Box className='mx-4'>
                <Flex>
                  <Truck size={16} className='mr-1' color='#008ECC' />
                  <Text size='1' className='text-gray-500'>
                    You can <Strong>track</Strong> your order
                  </Text>
                </Flex>
              </Box>
              <Separator orientation='vertical' />
              <Box className='mx-4'>
                <Flex>
                  <BadgePercent size={16} className='mr-1' color='#008ECC' />
                  <Text size='1' className='text-gray-500'>
                    Amazing <Strong>offers</Strong>
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    )
  }

  return (
    <nav className='flex flex-col border-b border-[#EDEDED]'>
      <PreNav />
      <Flex className='bg-white p-3'>
        <Container>
          <Flex align='center' justify='between'>
            <Box>
              <Flex align='center' gap='2'>
                <div className='bg-secondary p-2 rounded-md '>
                  <Store color='#008ECC' />
                </div>
                <Text size='5' weight='bold' className='text-primary'>
                  <Link href='/'>Ecommerce</Link>
                </Text>
              </Flex>
            </Box>
            <Box className='w-[512px]'>
              <TextField.Root className='bg-secondary rounded'>
                <TextField.Slot>
                  <Search size={16} />
                </TextField.Slot>
                <TextField.Input
                  color='blue'
                  variant='soft'
                  placeholder='Search the docs…'
                  size='3'
                />
                <TextField.Slot pr='3'>
                  <IconButton size='2' variant='ghost'>
                    <AlignJustify size={16} />
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
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
                      <>
                        <User className='mr-2' size={18} />
                        <p className='font-medium'>{data?.user?.name}</p>
                      </>
                    )}
                  </Flex>
                </Box>
                <Separator orientation='vertical' className='mx-4' />
                <Box>
                  <Flex>
                    <ShoppingCart color='#008ECC' />
                    <Link
                      href='/cart'
                      className='text-gray-500 ml-1 font-medium'
                    >
                      Cart
                    </Link>
                  </Flex>
                </Box>
              </div>
            </Box>
          </Flex>
        </Container>
      </Flex>
    </nav>
  )
}
export default Navigation
