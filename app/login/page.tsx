'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAtom } from 'jotai'
import tokenAtom from '../../atoms/tokenAtom'
import navLinksAtom from '@/atoms/navLinksAtom'
import { staffLinks } from '@/constants'
import userAtom from '@/atoms/userInfoAtom'
import { Paths } from '@/routes'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useAtom(tokenAtom)
  const [, setNavbarLinks] = useAtom(navLinksAtom)
  const [, setUser] = useAtom(userAtom)

  const getUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get('http://localhost:8000/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      setNavbarLinks(staffLinks)
      localStorage.setItem('navBarLinks', JSON.stringify(staffLinks))
      console.log(staffLinks)
      router.push(Paths.HOME)
    } catch (error) {
      // Handle any network error or invalid response
      console.error('Login error:', error)
    }
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/jwt/create/',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        // TODO: Remove local storage when neccesary
        localStorage.setItem('jwtToken', response.data.access)
        setToken(response.data.access)
        await getUserInfo(response.data.access)
      }
    } catch (error) {
      // Handle any network error or invalid response
      console.error('Login error:', error)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center ">
      <div className="container card-body max-w-2xl mx-auto mt-12 shadow-lg rounded-3xl p-6 bg-base-200">
        <form onSubmit={handleLogIn}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Log In
            </span>

            <input
              className="input input-bordered w-full max-w-xxl self-center mt-12"
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input input-bordered w-full max-w-xxl self-center my-8"
              required
              type="password"
              placeholder="Password"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
            >
              Log in
            </button>
            <span className="rounded-lg p-2 font-bold text-sm mt-12 self-center">
              Don&apos;t have an account?{' '}
              <button
                className="text-blue-500"
                type="button"
                onClick={() => {
                  router.push('/register')
                }}
              >
                Sign in
              </button>
            </span>
            <span className="rounded-lg p-2 font-bold text-sm mt-12 self-center">
              Forget password?{' '}
              <button
                className="text-blue-500"
                type="button"
                onClick={() => {
                  router.push('/reset-password')
                }}
              >
                Reset Password
              </button>
            </span>
          </div>
        </form>
      </div>
    </main>
  )
}
