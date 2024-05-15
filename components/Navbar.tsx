'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types'
import { Paths } from '@/routes'
import navLinksAtom from '@/atoms/navLinksAtom'
import userAtom from '@/atoms/userInfoAtom'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'

function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.includes('/login') || pathname.includes('/register')) return null

  const [user, setUser] = useAtom(userAtom)
  const [navbarLinks, setNavbarLinks] = useAtom(navLinksAtom)

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem('navBarLinks') || '[]')
    const userFromStorage = JSON.parse(
      localStorage.getItem('user') || 'null'
    ) as User

    setNavbarLinks(links)
    setUser(userFromStorage)
  }, [])

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    localStorage.removeItem('navBarLinks') // Remove JWT token from local storage
    router.push('/login') // Navigate to login page
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Image
          src="/cloud.svg"
          alt="logo"
          width={74}
          height={29}
          className=""
        />
        <a className="btn btn-ghost text-xl" href={Paths.HOME}>
          Registry Cloud
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          {navbarLinks.map((link) => (
            <li key={link.key}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <h5>{user?.email}</h5>
            </li>
            <br />

            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
