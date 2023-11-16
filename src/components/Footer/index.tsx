import { Box, Container, Flex, Separator } from "@radix-ui/themes"
import { Github, Mail } from "lucide-react"
import Link from "next/link"

const linkStyle = "text-white font-semibold"

const Links = [
  {
    id: 1,
    label: "About Us",
    href: "#",
  },
  {
    id: 2,
    label: "Terms & Conditions",
    href: "#",
  },
  {
    id: 3,
    label: "FAQ",
    href: "#",
  },
  {
    id: 4,
    label: "Privacy Policy",
    href: "#",
  },
]
const colStyle = "my-4"

function Footer() {
  return (
    <footer className='bg-primary'>
      <Container>
        <div>
          <Flex gap='9' justify='center' wrap='wrap'>
            <Box className={colStyle}>
              <p className='text-4xl font-semibold text-white '>
                Tech-Ecommerce
              </p>
              <Flex align='center' gap='2'>
                <Mail size={16} color="#fff"/>
                <span className='text-white'>
                  agustin.galante.19@outlook.es
                </span>
              </Flex>
            </Box>
          </Flex>
        </div>
        <Separator orientation='horizontal' size='4' />
        <Link
          className='text-secondary text-center font-semibold hover:text-white transition-colors'
          href='https://github.com/AgustinGalante19'
          target='_blank'
        >
          <Flex align='center' justify='center' my="2">
            <div>
              <Github />
            </div>
            <span>Agustin Galante</span>
          </Flex>
        </Link>
      </Container>
    </footer>
  )
}
export default Footer
