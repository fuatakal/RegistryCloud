'use client'

import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AlertContext from '../context/AlertContext'
import Alert from '../components/Alert'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [, setAlert] = useContext(AlertContext)
  // eslint-disable-next-line camelcase
  const { firstName, lastName, email, password, re_password } = formData

  const showAlert = (type, text) => {
    setAlert({
      type,
      text,
    })
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

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
      // console.error('Registration error:', error)
      showAlert('danger', 'Registration failed. Please try again.') // Show alert for registration failure
    }
  }

  return (
    <main className="h-screen bg-custom-purple flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-indigo-300 p-6">
        <form onSubmit={handleRegister}>
          <div className="flex flex-col flex-wrap">
            <span className="text-3xl font-bold self-center my-4 p-2">
              Register
            </span>

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="text"
              placeholder="First Name"
              name="first_name"
              value={firstName}
              onChange={onChange}
            />

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={lastName}
              onChange={onChange}
            />

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />

            <input
              className="bg-slate-100 rounded-xl mt-12 p-2"
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

      <Alert />
    </main>
  )
}
