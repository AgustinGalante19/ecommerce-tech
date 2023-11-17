import { Box, Container, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"

function Header() {
  return (
    <header className='my-4'>
      <Flex
        className='bg-blue-950 rounded-2xl p-8 max-sm:px-2 max-sm:py-8 max-xl:rounded-none max-md:rounded-none'
        justify='between'
      >
        <Box className='flex flex-col '>
          <Box className='my-auto text-white'>
            <Text size='6' weight='medium'>
              Best Deal Online on smart watches
            </Text>
            <br />
            <br />
            <p className='text-7xl font-bold max-sm:text-5xl'>SMART WEARABLE.</p>
            <br />
            <br />
            <Text size='6' weight='medium'>
              UP to 80% OFF
            </Text>
          </Box>
        </Box>
        <Box className='max-md:hidden'>
          <Image
            src='/smartwatch.png'
            width={280}
            height={280}
            alt='smartwatch image'
          />
        </Box>
      </Flex>
    </header>
  )
}
export default Header
