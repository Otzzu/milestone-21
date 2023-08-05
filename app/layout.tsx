import type { Metadata } from 'next'

import './globals.css'

import Navbar from '@/components/navbar'
import SupabaseProvider from '@/providers/supabase-provider'
import ToasterProvider from '@/providers/toaster-provider'
import ModalProvider from '@/providers/modal-provider'

export const metadata: Metadata = {
  title: 'RoadMap',
  description: 'Membantu MABA ITB menyusun rencana selama berkuliah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <ToasterProvider />
          <ModalProvider />
          <Navbar />
          <div className='pt-20'>
            {children}
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
