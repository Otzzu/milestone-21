"use client"

import { Auth } from "@supabase/auth-ui-react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'

import useAuthModal from "@/hooks/use-auth-modal"
import Modal from "@/components/ui/modal"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const { open, view, onClose }  = useAuthModal()
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      onClose()
      router.refresh()
    }
  }, [user])

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal open={open} onChange={onChange} title="Welcome back" desc="login to your account">
      <Auth 
        supabaseClient={supabaseClient}
        providers={["google"]}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
                colors: {
                    brand: "#111B47",
                    brandAccent: "rgba(17, 27, 71, 0.2)"
                }
            }
          }
        }}
        view={view}
      />
    </Modal>
  )
}

export default AuthModal