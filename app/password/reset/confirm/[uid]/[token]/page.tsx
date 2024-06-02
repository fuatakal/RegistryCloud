'use client'

import React, { ChangeEvent, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { alertStateAtom } from '@/atoms/alertAtom'

interface ResetPasswordConfirmProps {
  uid: string
  token: string
  new_password: string
  re_new_password: string
}

export default function ResetPasswordConfirm() {
  const router = useRouter()

  const pathname = usePathname()
  const pathnameParts = pathname.split('/')

  const [, setAlert] = useAtom(alertStateAtom)

  const [formData, setFormData] = useState<ResetPasswordConfirmProps>({
    uid: pathnameParts[4],
    token: pathnameParts[5],
    new_password: '',
    re_new_password: '',
  })

  const { new_password, re_new_password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleResetPasswordConfirm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      await fetch('http://localhost:8000/auth/users/reset_password_confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      setAlert({
        isVisible: true,
        message: `Password changed successfully.`,
        variant: 'success',
      })

      router.push('/login')
    } catch (error) {
      console.error('Registration error:', error)
      setAlert({
        isVisible: true,
        message: error as string,
        variant: 'error',
      })
      console.log(formData)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-base-200 p-6">
        <form onSubmit={handleResetPasswordConfirm}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Enter New Password
            </span>

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="password"
              placeholder="Password"
              name="new_password"
              value={new_password}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="password"
              placeholder="Rewrite your Password"
              name="re_new_password"
              value={re_new_password}
              onChange={onChange}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
