import { Box, Container, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"

function Header() {
  return (
    <header className='my-4'>
      <Flex
        className='bg-blue-950 rounded-2xl p-8 max-md:rounded-none'
        justify='between'
      >
        <Box className='flex flex-col '>
          <Box className='my-auto text-white'>
            <Text size='6' weight='medium'>
              Best Deal Online on smart watches
            </Text>
            <br />
            <br />
            <Text size='9' weight='bold'>
              SMART WEARABLE.
            </Text>
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
