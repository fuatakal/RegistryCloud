'use client'

import { createContext, useEffect, useRef, useState } from 'react'

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)
  const timeRef = useRef(null)

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
    timeRef.current = setTimeout(() => {
      setAlert(null)
    }, 4000)
  }, [alert])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AlertContext.Provider value={[alert, setAlert]}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
