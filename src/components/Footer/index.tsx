import { Container, Flex, Separator } from "@radix-ui/themes"
import { Github, Mail } from "lucide-react"
import Link from "next/link"

const linkStyles =
  " text-white font-semibold hover:text-gray-300 transition-colors"

function Footer() {
  return (
    <footer className='bg-primary'>
      <Container>
        <div className='p-4'>
          <Flex gap='9' justify='center' wrap='wrap'>
            <p className='text-4xl font-semibold text-white '>Tech-Ecommerce</p>
          </Flex>
        </div>
        <Separator orientation='horizontal' size='4' />
        <Flex p='2' justify='center' align='center' gap='2'>
          <Link
            className={linkStyles}
            href='https://github.com/AgustinGalante19'
            target='_blank'
          >
            <Github />
          </Link>
          <Link
            className={linkStyles}
            href='https://agustin-galante.netlify.app/'
            target='_blank'
          >
            Portfolio
          </Link>
          <Link
            className={linkStyles}
            href='mailto:agustin.galante.19@outlook.es'
            target='_blank'
          >
            <Mail />
          </Link>
        </Flex>
      </Container>
    </footer>
  )
}
export default Footer
