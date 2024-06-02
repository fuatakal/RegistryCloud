'use client'

import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAtom } from 'jotai'
import { alertStateAtom } from '@/atoms/alertAtom'

interface ResetPasswordProps {
  email: string
}

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState<ResetPasswordProps>({
    email: '',
  })
  const [, setAlert] = useAtom(alertStateAtom)

  const { email } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:8000/auth/users/reset_password/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setAlert({
        isVisible: true,
        message: `Link has been sent to mail.`,
        variant: 'success',
      })

      router.push('/login') // Redirect to login page after successful registration
    } catch (error) {
      console.error('Reset password error:', error)
      setAlert({
        isVisible: true,
        message: error as string,
        variant: 'error',
      })
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-base-200 p-6">
        <form onSubmit={handleResetPassword}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Reset Password
            </span>

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
            >
              Send reset link
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
