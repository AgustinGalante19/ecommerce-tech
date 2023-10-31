"use client"

import useErrorDialog from "@/shared/hooks/useErrorDialog"
import { Button, IconButton, TextField } from "@radix-ui/themes"
import { Eye, EyeOff, Lock, Mail, ShoppingBag } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import ErrorDialog from "@/shared/components/ErrorDialog"

function Register() {
  const [isPasswordShowed, setIsPasswordShowed] = useState(false)
  const { push } = useRouter()

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
    name: "",
    surname: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn("credentials", {
      ...formData,
      redirect: false,
    }).then((res) => {
      if (!res?.ok && res?.error) {
        changeContent({
          title: "Validation error",
          message: res?.error,
        })
        return openErrorDialog()
      }
      push("/")
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-secondary p-8 rounded-md'>
        <div className='flex justify-center items-center'>
          <ShoppingBag className='inline-block mr-2 my-auto text-primary' />
          <h3 className='font-bold text-center text-primary text-2xl'>
            Register
          </h3>
        </div>
        <div className='my-2'>
          <label htmlFor='name' className='font-semibold'>
            Name
          </label>
          <TextField.Root className='rounded'>
            <TextField.Slot>
              <Mail size={16} />
            </TextField.Slot>
            <TextField.Input
              placeholder='John'
              size='3'
              id='name'
              value={formData.name}
              onChange={handleInputChange}
              name='name'
            />
          </TextField.Root>
        </div>
        <div className='my-2'>
          <label htmlFor='surname' className='font-semibold'>
            Surname
          </label>
          <TextField.Root className='rounded'>
            <TextField.Slot>
              <Mail size={16} />
            </TextField.Slot>
            <TextField.Input
              placeholder='Doe'
              size='3'
              id='surname'
              value={formData.surname}
              onChange={handleInputChange}
              name='surname'
            />
          </TextField.Root>
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
            Already have an account?{" "}
            <Link href='/auth/login' className='text-primary underline'>
              Login!
            </Link>
          </p>
        </div>
        <div className='mt-4 mx-auto'>
          <Button className='w-full hover:cursor-pointer' color='cyan'>
            Login
          </Button>
        </div>
      </form>
      <ErrorDialog
        closeAlert={closeErrorDialog}
        content={content}
        isOpen={isErrorDialogOpen}
      />
    </div>
  )
}
export default Register
