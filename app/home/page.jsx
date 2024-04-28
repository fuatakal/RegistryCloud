'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAtom } from 'jotai'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import tokenAtom from '../../atoms/tokenAtom'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sessionToken] = useAtom(tokenAtom)

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Simulate checking the JWT token
        // TODO: replace with sessionToken when neccesary
        const token = localStorage.getItem('jwtToken')
        if (token) {
          // If token exists, you can perform a validation request to the server
          const response = await axios.post(
            'http://localhost:8000/auth/jwt/verify/',
            { token },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (response.status === 200) {
            // If token is valid, proceed to the homepage
            setLoading(false)
          }
        } else {
          // If token does not exist, redirect to login page
          setLoading(false)
          router.push('/login')
        }
      } catch (error) {
        // If an error occurs during token validation, redirect to login page
        // console.error('Token validation error:', error)
        setLoading(false)
        router.push('/login')
      }
    }

    checkToken()
  })

  const navbarLinks = [
    { href: '/', key: '1001', name: 'Home' },
    { href: '/', key: '1002', name: 'MyForms' },
    { href: '/', key: '1003', name: 'CreateForm' },
  ]

  return (
    <main>
      <Navbar links={navbarLinks} />
      {loading ? (
        // Loading screen while checking token
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        // Content after token check
        <div className="min-h-screen flex p-12 justify-center">
          <div className="container flex p-12 rounded-xl bg-slate-100 w-[75rem]">
            <h1>Hello</h1>
          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}
