'use client'

import userAtom from '@/atoms/userInfoAtom'
import { useAtom } from 'jotai'
import React from 'react'

interface ProfilePageProps {
  params: { id: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = params
  const [user] = useAtom(userAtom)

  return (
    <div className="min-h-screen flex items-start pt-12 justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            alt="User profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="w-48 h-48 rounded-full"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center mb-2">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-gray-700 text-center text-xl">{user?.email}</p>
      </div>
    </div>
  );
}
