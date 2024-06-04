import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import { Roboto } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import Navbar from '@/components/Navbar'
import Alert from '@/components/Alert'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${roboto.className}`}>
        <Suspense fallback={<Loading />}>
          <Alert />
          <NextTopLoader />
          <Navbar />
          <main className='className="flex-grow"'>{children}</main>

          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
