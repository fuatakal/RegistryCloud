'use client'

import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

interface RegisterProps {
  first_name: string
  last_name: string
  email: string
  password: string
  re_password: string
}

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterProps>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
  })
  // eslint-disable-next-line camelcase
  const { first_name, last_name, email, password, re_password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      router.push('/login')
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-base-200 p-6">
        <form onSubmit={handleRegister}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Register
            </span>

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="text"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="password"
              placeholder="Rewrite your Password"
              name="re_password"
              // eslint-disable-next-line camelcase
              value={re_password}
              onChange={onChange}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
            >
              Register
            </button>
            <span className="rounded-lg p-2 font-bold text-sm mt-12 self-center">
              Already have an account?
              <button
                className="text-blue-500"
                type="button"
                onClick={() => {
                  router.push('/login')
                }}
              >
                Log in
              </button>
            </span>
          </div>
        </form>
      </div>
    </main>
  )
}
