'use client'

import React, { ReactElement } from 'react'
import { useRouter } from 'next/navigation'

const Home = (): ReactElement => {
  const router = useRouter()

  const handleRouteLogin = async () => {
    router.push('/login')
  }

  const handleLoginClick = async () => {
    await handleRouteLogin()
  }

  const handleRouteSignIn = async () => {
    router.push('/register')
  }

  const handleSignInClick = async () => {
    await handleRouteSignIn()
  }

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen p-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="object-cover w-full h-full"
          src="/cloud.jpeg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>{' '}
        {/* Overlay for better readability */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Registry Cloud</h1>
        <p className="text-lg mb-8">Create stunning forms effortlessly</p>
        <div className="space-x-4">
          <button
            className="px-6 py-3 text-sm font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSignInClick}
          >
            Sign Up
          </button>
          <button
            className="px-6 py-3 text-sm font-semibold text-blue-500 bg-white border border-blue-500 rounded-md hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleLoginClick}
          >
            Sign In
          </button>
        </div>
        <p className="mt-72 text-2xl font-bold">
          Registry Cloud - Easily create, update, submit, and delete forms
        </p>
      </div>
    </main>
  )
}

export default Home
