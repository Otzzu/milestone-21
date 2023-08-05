"use client"

import { Auth } from "@supabase/auth-ui-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useAuthModal from "@/hooks/use-auth-modal"
import Modal from "./ui/modal"

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const { open, view, onClose }  = useAuthModal()

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