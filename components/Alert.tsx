'use client'

import React, { useEffect } from 'react'
import { AlertVariant, alertStateAtom } from '../atoms/alertAtom'
import { useAtom } from 'jotai'

const Alert: React.FC = () => {
  const [{ isVisible, message, variant }, setAlert] = useAtom(alertStateAtom)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, isVisible: false }))
      }, 5000) // Hide the alert after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, setAlert])

  const alertVariants: { [key in AlertVariant]: string } = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }

  return (
    <>
      {isVisible && (
        <div
          role="alert"
          className={`alert-container alert ${alertVariants[variant]} z-10`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <p className="text-white">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
