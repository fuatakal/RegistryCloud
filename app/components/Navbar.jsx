import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function Navbar({ links }) {
  const [isOpen, setIsOpen] = useState(false) // State to manage the dropdown visibility
  const router = useRouter()

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken') // Remove JWT token from local storage
    router.push('/login') // Navigate to login page
  }

  return (
    <nav className="flex text-white bg-indigo-900 gap-8 content-center relative z-30 py-3 mb-8">
      <Link href="/" className=" mr-16 flex items-center gap-4">
        <Image
          src="/cloud.svg"
          alt="logo"
          width={74}
          height={29}
          className=""
        />
        <span className=" font-extrabold ">Registry Cloud</span>
      </Link>
      <ul className="hidden md:flex h-full gap-12 self-center">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="  cursor-pointer transition-all hover:font-bold"
          >
            {link.name}
          </Link>
        ))}
      </ul>
      <div className="relative self-center ml-auto mr-8">
        {/* Dropdown Trigger */}
        <button
          type="button"
          className="flex items-center hover:text-gray-900 focus:outline-none"
          onClick={toggleDropdown}
        >
          <span className="mr-2">Username</span>
        </button>

        {/* Dropdown Content */}
        {isOpen && ( // Render dropdown content if isOpen is true
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Profile
            </button>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Settings
            </button>
            <hr className="my-2" />
            <button
              type="button"
              className="block px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-500 w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
