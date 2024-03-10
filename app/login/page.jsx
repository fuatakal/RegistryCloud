'use client'

import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertContext from '../context/AlertContext'
import Alert from '../components/Alert'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setAlert] = useContext(AlertContext)

  const showAlert = (type, text) => {
    setAlert({
      type,
      text,
    })
  }

  const handleLogIn = async (e) => {
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
        router.push('/')
      } else {
        // Handle the case where login failed
        console.error('Login failed')
        showAlert('danger', 'Check your email and password.')
      }
    } catch (error) {
      // Handle any network error or invalid response
      console.error('Login error:', error)
      showAlert('danger', 'An error occurred while logging in.')
    }
  }

  return (
    <main className="h-[90vh]">
      <div className="container max-w-2xl h-[70vh] mx-auto mt-12 rounded-3xl bg-indigo-600 p-6">
        <form onSubmit={handleLogIn}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Log In
            </span>

            <input
              className="bg-slate-700 rounded-xl mt-12 p-2"
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-slate-700 rounded-xl mt-12 p-2"
              required
              type="password"
              placeholder="Password"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-green-600 rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
            >
              Log in
            </button>
            <span className=" bg-orange-700 rounded-lg p-2 font-bold text-sm mt-12 self-center">
              Don&apos;t have an account?
            </span>
            <button
              className=" bg-red-900 rounded-lg p-2 w-[90px] mt-4 mx-4 self-center font-bold"
              type="button"
              onClick={() => {
                router.push('/register')
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <Alert />
    </main>
  )
}
