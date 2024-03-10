import React, { useContext } from 'react'
import AlertContext from '../context/AlertContext'
import '../globals.css'

function Alert() {
  const severity = {
    danger: 'bg-red-400',
    warning: 'bg-yellow-400',
    success: 'bg-green-400',
  }

  const [alert] = useContext(AlertContext)

  if (!alert) {
    return null
  }

  const backgroundColorClass = severity[alert.type] || 'bg-gray-400' // Default to gray-400 if the type is not found in severity

  return <div className={`alert ${backgroundColorClass} `}>{alert.text}</div>
}

export default Alert
