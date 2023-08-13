import type { Metadata } from 'next'

import './globals.css'

import Navbar from '@/components/navbar'
import SupabaseProvider from '@/providers/supabase-provider'
import ToasterProvider from '@/providers/toaster-provider'
import ModalProvider from '@/providers/modal-provider'
import { ScrollArea } from '@/components/ui/scroll-area'

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
        <ScrollArea className='h-screen w-screen z-50'>
        <SupabaseProvider>
          <ToasterProvider />
          <ModalProvider />
          <Navbar />
          <div className='pt-20'>
            {children}
          </div>
        </SupabaseProvider>
        </ScrollArea>
      </body>
    </html>
  )
}
