import { useCases } from "@/api/useCases"
import { Category } from "@prisma/client"
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

async function getCategories(): Promise<ApiResponse<Category>> {
  try {
    const categories = await useCases.serverSide.getAllCategories()
    const response = await categories.json()
    return response
  } catch (err) {
    console.log("error on footer", err)
    return {
      data: [],
      error: [],
      result: "error",
    }
  }
}

async function Footer() {
  const categories = await getCategories()
  return (
    <footer className='bg-primary p-6'>
      <Container>
        <Flex className='mb-4'>
          <p className='text-4xl font-semibold text-white'>Tech-Ecommerce</p>
        </Flex>
        <div>
          <Flex justify='between' wrap='wrap'>
            <Box className={colStyle}>
              <span className='font-medium underline text-white'>
                Contact me
              </span>
              <ul className='font-medium text-white'>
                <li className='my-1'>
                  <Flex align='center' gap='2'>
                    <Mail size={16} />
                    agustin.galante.19@outlook.es
                  </Flex>
                </li>
              </ul>
            </Box>
            <Box className={colStyle}>
              <p className='text-white font-medium underline'>Categories</p>
              <ul className='list-disc text-white'>
                {categories.data.map((category) => (
                  <li key={category.categoryId}>
                    <Link
                      href={`/category/${category.categoryId}`}
                      className={linkStyle}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
            <Box className={colStyle}>
              <p className='text-white font-medium underline'>
                Customer Service
              </p>
              <ul className='list-disc text-white'>
                {Links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className={linkStyle}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Flex>
        </div>
        <Separator orientation='horizontal' size='4' className='my-4' />
        <Link
          className='text-secondary text-center font-semibold hover:text-white transition-colors'
          href='https://github.com/AgustinGalante19'
        >
          <Flex align='center' justify='center'>
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
