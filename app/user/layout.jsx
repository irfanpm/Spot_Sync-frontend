import Navbar from '@/components/Navbar'
import StickyFooter from '@/components/footer'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Loading from './loading'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Suspense fallback={<Loading/>} > <Navbar />{children}<StickyFooter/> </Suspense></body>
    </html>
  )
}
