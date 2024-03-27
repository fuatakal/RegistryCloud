'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Simulate checking the JWT token (Replace with actual code)
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
    { href: '/', key: 'test', name: 'test' },
    { href: '/', key: 'test2', name: 'test2' },
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
        <div className="min-h-screen">hello</div>
      )}
      <Footer />
    </main>
  )
}
