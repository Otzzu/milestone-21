"use client"

import { useEffect, useState } from 'react'

import AddReviewModal from '@/components/add-review-modal'
import AuthModal from '@/components/auth-modal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
        <AuthModal />
        <AddReviewModal />
    </>
  )
}

export default ModalProvider