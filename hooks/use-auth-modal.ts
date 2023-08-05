import { create } from "zustand"

interface AuthModalProps {
  open: boolean,
  view: any,
  onOpenSignin: () => void,
  onClose: () => void,
  onOpenSignup: () => void,
 
}

const useAuthModal = create<AuthModalProps>((set) => ({
    open: false,
    view: "sign_in",
    onOpenSignin: () => set({ open: true, view: "sign_in" }),
    onClose: () => set({ open: false }),
    onOpenSignup: () => set({ open: true, view: "sign_up" }),
  }))

export default useAuthModal