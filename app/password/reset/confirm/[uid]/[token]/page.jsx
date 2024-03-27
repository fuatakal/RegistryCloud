'use client'

import React, { useState, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import AlertContext from '../../../../../context/AlertContext'
import Alert from '../../../../../components/Alert'

export default function Page() {
  const router = useRouter()
  // eslint-disable-next-line camelcase
  const [new_password, set_new_password] = useState('')
  // eslint-disable-next-line camelcase
  const [re_new_password, set_re_new_password] = useState('')
  const pathname = usePathname()
  const pathnameParts = pathname.split('/')
  const uid = pathnameParts[4]
  const token = pathnameParts[5]

  const [, setAlert] = useContext(AlertContext)

  const showAlert = (type, text) => {
    setAlert({
      type,
      text,
    })
  }

  const handleResetPasswordConfirm = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // const body = JSON.stringify({ uid, token, new_password, re_new_password })

      const response = await axios.post(
        'http://localhost:8000/auth/users/reset_password_confirm/',
        // eslint-disable-next-line camelcase
        { uid, token, new_password, re_new_password },
        config
      )

      if (response.status === 200) {
        //
      }
    } catch (error) {
      // Handle any network error or invalid response

      showAlert('danger', 'reset password.')
    }
  }

  return (
    <main className=" h-screen bg-custom-purple flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-indigo-300 p-6">
        <form onSubmit={handleResetPasswordConfirm}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              reset password confirm
            </span>

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="password"
              placeholder="New password"
              name="new_password"
              onChange={(e) => set_new_password(e.target.value)}
            />
            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="password"
              placeholder="Rewrite your password"
              name="re_new_password"
              onChange={(e) => set_re_new_password(e.target.value)}
            />

            <button
              className="btn btn-primary rounded-lg p-2 w-[90px] mt-12 mx-4 self-center font-bold"
              type="submit"
              onClick={() => {
                router.push('/login')
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>

      <Alert />
    </main>
  )
}
