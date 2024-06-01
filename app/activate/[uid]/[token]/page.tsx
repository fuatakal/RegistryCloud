'use client'

import React from 'react'
import { useState } from 'react'
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

  const handleActivationClick = async () => {
    // Handle potential re-activation attempt (optional)
    if (activationStatus === 'success') {
      return // Account already activated
    }

    await handleActivation()
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex justify-center max-w-2xl mx-auto rounded-3xl p-6">
        <button
          className="btn btn-outline btn-info min-w-6 min-h-3"
          type="submit"
          onClick={handleActivationClick}
        >
          Activate My Account
        </button>
      </div>
    </main>
  )
}

export default ActivatePage
