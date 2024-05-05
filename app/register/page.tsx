'use client'

import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface RegisterProps {
  firstName: string
  lastName: string
  email: string
  password: string
  re_password: string
}

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    re_password: '',
  })
  // eslint-disable-next-line camelcase
  const { firstName, lastName, email, password, re_password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/users/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        // Assuming the server responds with status 201 upon successful registration
        router.push('/login') // Redirect to login page after successful registration
      }
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
              value={firstName}
              onChange={onChange}
            />

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={lastName}
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
              Already have an account?{' '}
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
