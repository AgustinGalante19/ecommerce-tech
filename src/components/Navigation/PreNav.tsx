import { Box, Container, Flex, Separator, Strong, Text } from "@radix-ui/themes"
import { BadgePercent, MapPin, Truck } from "lucide-react"

const PreNav = () => {
  return (
    <Container className='bg-offwhite p-2'>
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
  )
}

export default PreNav
