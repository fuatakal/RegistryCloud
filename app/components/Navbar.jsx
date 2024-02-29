import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar({ links }) {
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
      <div className="flex self-center ml-auto mr-8">
        <span>username</span>
      </div>
    </nav>
  )
}

export default Navbar
