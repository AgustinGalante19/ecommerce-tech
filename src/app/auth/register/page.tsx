"use client"

import useErrorDialog from "@/hooks/useErrorDialog"
import { Button, IconButton, TextField } from "@radix-ui/themes"
import { Eye, EyeOff, Lock, Mail, ShoppingBag } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import ErrorDialog from "@/components/ErrorDialog"
import axios from "axios"

function Register() {
  const [isPasswordShowed, setIsPasswordShowed] = useState(false)
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { closeErrorDialog, content, isErrorDialogOpen } = useErrorDialog()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    axios.post<ApiResponse<boolean>>("/auth/register", formData).then((res) => {
      if (res.data.result === "ok") {
        signIn("credentials", {
          ...formData,
          redirect: false,
        }).then((authRes) => {
          if (authRes?.ok) {
            push("/")
          }
        })
      }
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
              required
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
              required
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
            Already have an account?{" "}
            <Link href='/auth/login' className='text-primary underline'>
              Login!
            </Link>
          </p>
        </div>
        <div className='mt-4 mx-auto'>
          <Button
            className='w-full hover:cursor-pointer'
            color='cyan'
            disabled={isLoading}
          >
            Register
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
