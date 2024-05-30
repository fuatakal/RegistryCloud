'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'

function ActivatePage() {
  const router = useRouter()
  const [activationStatus, setActivationStatus] = useState('pending')

  const pathname = usePathname()
  const pathnameParts = pathname.split('/')

  const uid = pathnameParts[2]
  const token = pathnameParts[3]

  const handleActivation = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/users/activation/',
        { uid, token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 204) {
        setActivationStatus('success')
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (uid && token) {
      // Only attempt activation if parameters exist
      handleActivation()
    }
  }, [uid, token])

  const handleActivationClick = async () => {
    // Handle potential re-activation attempt (optional)
    if (activationStatus === 'success') {
      return // Account already activated
    }

    await handleActivation()
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-success p-6">
        <button type="submit" onClick={handleActivationClick}>
          Activate My Account
        </button>
      </div>
    </main>
  )
}

export default ActivatePage
