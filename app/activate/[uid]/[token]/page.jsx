'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import Alert from '../../../components/Alert'
// import AlertContext from '../../../context/AlertContext'

function ActivatePage() {
  const router = useRouter()
  const [activationStatus, setActivationStatus] = useState('pending')
  const [, setErrorMessage] = useState(null)
  // const [, setAlert] = useContext(AlertContext)

  const pathname = usePathname()
  const pathnameParts = pathname.split('/')

  const uid = pathnameParts[2]
  const token = pathnameParts[3]

  // const showAlert = (type, text) => {
  //   setAlert({
  //     type,
  //     text,
  //   })
  // }

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
      setErrorMessage(error.message || 'An error occurred.')
      // showAlert('danger', errorMessage)
    }
  }

  useEffect(() => {
    if (uid && token) {
      // Only attempt activation if parameters exist
      handleActivation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token])

  const handleActivationClick = async () => {
    // Handle potential re-activation attempt (optional)
    if (activationStatus === 'success') {
      return // Account already activated
    }

    await handleActivation()
  }

  return (
    <main className="h-screen bg-custom-purple flex items-center justify-center">
      <div className="container max-w-2xl mx-auto mt-12 rounded-3xl bg-indigo-300 p-6">
        <button type="submit" onClick={handleActivationClick}>
          Activate My Account
        </button>
      </div>
      <Alert />
    </main>
  )
}

export default ActivatePage
