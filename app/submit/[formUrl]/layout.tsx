import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col h-screen flex-grow mx-auto gap-2">
      {children}
    </div>
  )
}

export default layout
