'use client'

import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertContext from '../context/AlertContext'
import Alert from '../components/Alert'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [, setAlert] = useContext(AlertContext)

  const showAlert = (type, text) => {
    setAlert({
      type,
      text,
    })
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const body = JSON.stringify({ email })

      const response = await axios.post(
        'http://localhost:8000/auth/users/reset_password/',
        body,
        config
      )

      if (response.status === 200) {
        // ok
      }
    } catch (error) {
      // Handle any network error or invalid response

      showAlert('danger', 'reset_password failed.')
    }
  }

  return (
    <main className=" h-screen bg-custom-purple flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-indigo-300 p-6">
        <form onSubmit={handleResetPassword}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              ResetPassword
            </span>

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
              onClick={() => {
                router.push('/login')
              }}
            >
              Reset password
            </button>
          </div>
        </form>
      </div>

      <Alert />
    </main>
  )
}
