"use client"

import { Button, IconButton, TextField } from "@radix-ui/themes"
import { Eye, EyeOff, Info, Lock, Mail, ShoppingBag } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import useErrorDialog from "@/hooks/useErrorDialog"
import ErrorDialog from "@/components/ErrorDialog"
import { useRouter } from "next/navigation"

function Form() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordShowed, setIsPasswordShowed] = useState(false)
  const { push } = useRouter()
  const [open, setOpen] = useState(false)
  const {
    changeContent,
    closeErrorDialog,
    content,
    isErrorDialogOpen,
    openErrorDialog,
  } = useErrorDialog()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    signIn("credentials", {
      ...formData,
      redirect: false,
    }).then((res) => {
      if (!res?.ok && res?.error) {
        changeContent({
          title: "Validation error",
          message: res?.error,
        })
        setIsLoading(false)
        return openErrorDialog()
      }
      setIsLoading(false)
      push("/")
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='bg-secondary p-8 rounded-md'>
        <div className='flex justify-center items-center'>
          <ShoppingBag className='inline-block mr-2 my-auto text-primary' />
          <h3 className='font-bold text-center text-primary text-2xl'>Login</h3>
        </div>

        <div className='my-2'>
          <label htmlFor='email' className='font-semibold'>
            Email
          </label>
          <TextField.Root className='rounded'>
            <TextField.Slot>
              <Mail size={16} />
            </TextField.Slot>
            <TextField.Input
              required
              placeholder='miname@mail.com'
              size='3'
              id='email'
              value={formData.email}
              onChange={handleInputChange}
              name='email'
            />
          </TextField.Root>
        </div>
        <div className='my-2'>
          <label htmlFor='password' className='font-semibold'>
            Password
          </label>
          <TextField.Root className='rounded'>
            <TextField.Slot>
              <Lock size={16} />
            </TextField.Slot>
            <TextField.Input
              required
              id='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='MyP4ssW0rD$@!'
              type={isPasswordShowed ? "text" : "password"}
              size='3'
              name='password'
            />
            <TextField.Slot pr='3'>
              <IconButton
                size='2'
                variant='ghost'
                className='hover:cursor-pointer'
                onClick={() => setIsPasswordShowed(!isPasswordShowed)}
                type='button'
              >
                {isPasswordShowed ? <EyeOff size={16} /> : <Eye size={16} />}
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </div>
        <div>
          <p className='text-sm text-gray-500'>
            Do not have an account?{" "}
            <Link href='/auth/register' className='text-primary underline'>
              Register!
            </Link>
          </p>
        </div>
        <div className='mt-4 mx-auto'>
          <Button
            className='w-full hover:cursor-pointer'
            color='cyan'
            disabled={isLoading}
          >
            Login
          </Button>
        </div>
        <div className='mt-2 ml-2'>
          <Button
            variant='ghost'
            onClick={() => setOpen((open) => !open)}
            type='button'
            /* className='flex items-center' */
          >
            <Info size={18} /> Show test user
          </Button>
        </div>
        {open && (
          <div className='flex flex-col gap-2'>
            <span>testuser@mail.com</span>
            <span>TestUser123#</span>
          </div>
        )}
      </form>
      <ErrorDialog
        closeAlert={closeErrorDialog}
        content={content}
        isOpen={isErrorDialogOpen}
      />
    </>
  )
}
export default Form
