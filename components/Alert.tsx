'use client'

import React, { useEffect } from 'react'
import { AlertVariant, alertStateAtom } from '../atoms/alertAtom'
import { useAtom } from 'jotai'
import { BiCheck, BiInfoCircle, BiError, BiErrorCircle } from 'react-icons/bi'

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

  const alertVariants: {
    [key in AlertVariant]: { bg: string; iconBg: string; icon: React.ReactNode }
  } = {
    success: {
      bg: 'bg-green-100',
      iconBg: 'bg-green-500',
      icon: <BiCheck size={24} color="white" />,
    },
    info: {
      bg: 'bg-blue-100',
      iconBg: 'bg-blue-500',
      icon: <BiInfoCircle size={24} color="white" />,
    },
    warning: {
      bg: 'bg-yellow-100',
      iconBg: 'bg-yellow-500',
      icon: <BiError size={24} color="white" />,
    },
    error: {
      bg: 'bg-red-100',
      iconBg: 'bg-red-500',
      icon: <BiErrorCircle size={24} color="white" />,
    },
  }

  return (
    <>
      {isVisible && (
        <div
          role="alert"
          className={`alert-container alert ${alertVariants[variant].bg} z-10`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div
              className={`p-1 rounded-full mr-2 ${alertVariants[variant].iconBg}`}
            >
              {alertVariants[variant].icon}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-800">{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
